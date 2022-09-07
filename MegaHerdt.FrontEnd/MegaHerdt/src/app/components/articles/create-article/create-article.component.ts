import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleCreation } from 'src/app/models/Article/ArticleCreation';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { ArticleService } from 'src/app/services/articles/article.service';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { DialogCreateBrandComponent } from '../../brands/create-brand/dialog-create-brand/dialog-create-brand.component';
import { DialogCreateCategoryComponent } from '../../categories/create-category/dialog-create-category/dialog-create-category.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  article: ArticleCreation;
  statusSubmit: string;
  categories: Array<Category>;
  brands: Array<Brand>;
  categoryId: number;
  brandId: number;
  imageOk: boolean = false;

  constructor(private _storageService: StorageService, private _articleService: ArticleService,
    private _categoryService: CategoryService, private _brandService: BrandService,public dialog: MatDialog) {
    this.article = new ArticleCreation("", "codeNotNULL", new File(new Array, ''), 0, 0, 0, 0);
    this.statusSubmit = "";
    this.categories = new Array<Category>();
    this.categoryId = 0;
    this.brands = new Array<Brand>();
    this.brandId = 0;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
  }

  onSubmit(form: any) {
    this.article.categoryId = this.categoryId;
    this.article.brandId = this.brandId;
    this._articleService.sendFormData(this.article, "create").subscribe({
      next: (response) => {
        if (response.error) {
          console.log("no se pudo crear el articulo");
          this.statusSubmit = "failed";
        } else {
          this.statusSubmit = "success";
          window.location.reload();
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
    
  }

  loadCategories() {
    this._categoryService.categories.subscribe({
      next: res => this.categories = res
    })
  }

  loadBrands(){
    this._brandService.brands.subscribe({
      next: res => this.brands = res
    })
  }

  onChange(fileInput: any){
    this.article.image = <File>fileInput.target.files[0];
    this.imageOk = true;
  }

  disabledForm(articleForm:any): boolean{
    return articleForm.invalid || !this.imageOk || this.categoryId == 0 || this.brandId == 0;
  }

  openDialogCreateBrand(){
    const dialogRef = this.dialog.open(DialogCreateBrandComponent,
      {
        data: this.article,
        height: '325px',
        width: '500px'
      });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result != undefined){
        this.loadBrands();
      }
    });
  }

  openDialogCreateCategory(){
    const dialogRef = this.dialog.open(DialogCreateCategoryComponent,
      {
        data: this.article,
        height: '325px',
        width: '500px'
      });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result != undefined){
        this.loadCategories();
      }
    });
  }
}
