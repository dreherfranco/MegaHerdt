import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleProvider } from 'src/app/models/ArticleProvider/ArticleProvider';
import { ArticleProviderUpdate } from 'src/app/models/ArticleProvider/ArticleProviderUpdate';
import { ArticleProviderVoucherUpdate } from 'src/app/models/ArticleProvider/ArticleProviderVoucherUpdate';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Provider } from 'src/app/models/Provider/Provider';
import { ArticleProvisionService } from 'src/app/services/articles-provisions/article-provision.service';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogConfirmDeleteComponent } from '../../general/dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogUpdateArticleProvisionComponent } from './dialog-update-article-provision/dialog-update-article-provision.component';

@Component({
  selector: 'app-edit-articles-provisions',
  templateUrl: './edit-articles-provisions.component.html',
  styleUrls: ['./edit-articles-provisions.component.css']
})
export class EditArticlesProvisionsComponent implements OnInit {
  providers: Array<Provider>;
  articles: Array<ArticleName>;
  articlesProviders: Array<ArticleProvider>;
  updateSuccess: boolean;
  paginate: Paginate;
  searchText: string = "";
  
  constructor(private _articleProvisionService: ArticleProvisionService,
    private _storageService: StorageService,
    public dialog: MatDialog) {
    this.providers = new Array<Provider>();
    this.articles = new Array<ArticleName>();
    this.articlesProviders = new Array<ArticleProvider>();
    this.updateSuccess = false;
    this.paginate = new Paginate(1,3)
   }

  ngOnInit(): void {
    this.loadArticlesProviders();
  }

  openDialogUpdate(articleProvider: ArticleProvider){     
      const dialogRef = this.dialog.open(DialogUpdateArticleProvisionComponent,
        {
          disableClose:true,
          data: articleProvider,
          height: '175px',
          width: '500px'
        });
  
      dialogRef.afterClosed().subscribe((result: ArticleProvider) => {
        if(result != undefined){
          this.update(result);
        }
      });
  }

  mapperArticleProvider(articleProvider: ArticleProvider){
    return new ArticleProviderUpdate(articleProvider.id,articleProvider.provider.id,
      articleProvider.article.id, articleProvider.provisionDate, articleProvider.articleQuantity);
  }

  update(articleProvider: ArticleProvider){
    var articleProviderUpdate = this.mapperArticleProvider(articleProvider);
    this._articleProvisionService.update(articleProviderUpdate, this._storageService.getTokenValue())
    .subscribe({
      next: (response) => {
        if (response.error) {
            console.log("no se pudieron cargar las marcas");
        } else {
          this.updateSuccess = true;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  openDialogDelete(articleProviderId: number){     
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent,
      {
        disableClose:true,
        data: articleProviderId,
        height: '175px',
        width: '500px'
      });

    dialogRef.afterClosed().subscribe((result: number) => {
      if(result != undefined){
        this.deleteArticleProvider(result);
      }
    });
}

  deleteArticleProvider(id: number){
    this._articleProvisionService.delete(id, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
            console.log("no se pudo eliminar la provision");
        } else {
          console.log("provision eliminada correctamente")
          this._articleProvisionService.updateArticleProviders();
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  loadArticlesProviders(){
    this._articleProvisionService.articlesProviders.subscribe({
      next: (res) =>{ 
        this.articlesProviders = res;
      }
    });
  }

  onChange(fileInput: any, articleProvider: ArticleProvider){
    var voucher = new File(new Array,'')
    voucher = <File>fileInput.target.files[0];
    var articleProviderVoucherUpdate = new ArticleProviderVoucherUpdate(articleProvider.id, voucher);
    this._articleProvisionService.sendFormData(articleProviderVoucherUpdate,"update-voucher")
  }

}
