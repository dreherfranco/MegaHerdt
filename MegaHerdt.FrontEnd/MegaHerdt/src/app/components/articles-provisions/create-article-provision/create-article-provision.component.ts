import { Component, OnInit } from '@angular/core';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleProviderCreation } from 'src/app/models/ArticleProvider/ArticleProviderCreation';
import { ArticleProviderSerialNumberCreation } from 'src/app/models/ArticleProviderSerialNumber/ArticleProviderSerialNumberCreation';
import { Provider } from 'src/app/models/Provider/Provider';
import { ArticleProvisionService } from 'src/app/services/articles-provisions/article-provision.service';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-article-provision',
  templateUrl: './create-article-provision.component.html',
  styleUrls: ['./create-article-provision.component.css']
})
export class CreateArticleProvisionComponent implements OnInit {
  providers: Array<Provider>;
  articles: Array<ArticleName>;
  articleProvider: ArticleProviderCreation;
  serialNumberToAdd: string = '';

  constructor(private _articleProvisionService: ArticleProvisionService, private _providerService: ProviderService, private _storageService: StorageService,
    private _articleService: ArticleService) {
    this.providers = new Array<Provider>();
    this.articles = new Array<ArticleName>();
    this.articleProvider = new ArticleProviderCreation(0, 0, new File(new Array, ''), new Date(), 0, true);
    this.updateArticleProvidersInterval();
  }

  ngOnInit(): void {
    this.loadProviders();
    this.loadArticles();
  }

  updateArticleProvidersInterval(){
    setInterval(
      ()=>{
        this._articleProvisionService.updateArticleProviders();
      },1000
    );
  }
  onSubmit(form: any) {
    if(this.articleProvider.add){ this.articleProvider.discountReason = '#'; }
    this._articleProvisionService.sendFormData(this.articleProvider, "create");
    setTimeout(
      () => {
        this._articleProvisionService.updateArticleProviders();
        form.reset();
      }, 600)
  }

  loadProviders() {
    this._providerService.getAll(this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudieron cargar los proveedores");
        } else {
          this.providers = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  loadArticles() {
    this._articleService.getArticleNames().subscribe({
      next: (response) => {
        if (response.error) {
          console.log("error al obtener articulos");
        } else {
          this.articles = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onChange(fileInput: any) {
    this.articleProvider.voucher = <File>fileInput.target.files[0]
  }

  discountStock(){
    this.articleProvider.add = false;
  }
  addStock(){
    this.articleProvider.add = true;
  }

  addSerialNumber(){
    let newSerialNumber = this.serialNumberToAdd;
    this.articleProvider.serialNumbers.push(newSerialNumber);
    this.serialNumberToAdd = '';
  }
}
