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
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



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
  

  constructor(private _storageService: StorageService, private _articleService: ArticleService, private _router: Router,
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
        console.log(response);
        if (response.error) {
          console.log("no se pudo crear el articulo");
          this.statusSubmit = "failed";
          Swal.fire({
            title: 'No se pudo crear el articulo',
            icon: 'error',            
            backdrop: `rgba(0, 0,125, 0.37)`,
          });
        } else {
          this.statusSubmit = "success";
          this.article = new ArticleCreation("", "codeNotNULL", new File(new Array, ''), 0, 0, 0, 0);
          this.imageOk = false;
          this.categoryId = 0;
          this.brandId = 0;

          Swal.fire({
            title: 'Articulo creado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            backdrop: `rgba(0, 0,125, 0.37)`,
          }).then((result) => {
            if (result.isConfirmed) {                
              this._router.navigate(['/administrate/administrate-articles/edit']);
            }
          });
        //  window.location.reload();
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
        height: '400px',
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
        height: '400px',
        width: '500px'
      });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result != undefined){
        this.loadCategories();
      }
    });
  }
}
