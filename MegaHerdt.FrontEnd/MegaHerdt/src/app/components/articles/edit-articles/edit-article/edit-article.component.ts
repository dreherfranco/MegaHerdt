import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from 'src/app/components/general/dialog-confirm-delete/dialog-confirm-delete.component';
import { Article } from 'src/app/models/Article/Article';
import { ArticleUpdate } from 'src/app/models/Article/ArticleUpdate';
import { ArticleUpdateImage } from 'src/app/models/Article/ArticleUpdateImage';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { ArticleOfferDetail } from 'src/app/models/ArticleOffer/ArticleOfferDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogUpdateArticleComponent } from '../dialog-update-article/dialog-update-article.component';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  @Input() article: Article;
  categories: Array<Category>;
  brands: Array<Brand>;
  image: File;
  updateSuccess: boolean;
  constructor(private _categoryService: CategoryService, private _brandService: BrandService, 
    private _articleService: ArticleService, private _storageService: StorageService, 
    public dialog: MatDialog) 
  { 
    this.article = this.instanceArticle() ;
    this.categories = new Array<Category>();
    this.brands = new Array<Brand>();
    this.image = new File(new Array,'');
    this.updateSuccess = false;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  private instanceArticle(): Article {
    let brand = new Brand (0,'');
    let category = new Category (0,'');
    let offers = new Array<ArticleOfferDetail>();
    let article = new Article(0,'','',0,'',0,0,brand,category,offers, offers);
    return article;
  }

  loadCategories() {
    this._categoryService.getAll().subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudieron cargar las categorias");
        } else {
          this.categories = response;
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  loadBrands(){
    this._brandService.getAll().subscribe({
        next: (response) => {
          if (response.error) {
              console.log("no se pudieron cargar las categorias");
          } else {
            this.brands = response;
          }
        },
        error: (err) => {
          console.log(err)
        }
    });
  }

  onChange(fileInput: any){
    this.image = <File>fileInput.target.files[0];
    var articleImage = new ArticleUpdateImage(this.article.id, this.image);
    this._articleService.sendFormData(articleImage,"update-image")
  }

  openDialogUpdate() {
    const dialogRef = this.dialog.open(DialogUpdateArticleComponent,
      {
        disableClose:true,
        data: this.article
      });

    dialogRef.afterClosed().subscribe((result: Article) => {
      if(result != undefined){
        this.update();
      }
    });
  }

  update(){
    var article = this.mapperArticle();
    this._articleService.sendFormData(article, "update").subscribe({
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

   openDialogDelete() {
    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent,
      {
        disableClose:true,
        data: this.article
      });

    dialogRef.afterClosed().subscribe((result: Article) => {
      if(result != undefined){
        this.delete();
      }
    });
  }
  
  delete(){
    this._articleService.delete(this.article.id, this._storageService.getTokenValue()).subscribe({
      next: (response) => {
        if (response.error) {
            console.log("no se pudieron cargar las marcas");
        } else {
           window.location.reload();
        }
      },
      error: (err) => {
        console.log(err)
      }
    });

  }

  mapperArticle(): ArticleUpdate{
    return new ArticleUpdate(this.article.id, this.article.name,
      this.article.code,
      this.article.stock,this.article.unitValue,
      this.article.brand.id,this.article.category.id);
  }
}
