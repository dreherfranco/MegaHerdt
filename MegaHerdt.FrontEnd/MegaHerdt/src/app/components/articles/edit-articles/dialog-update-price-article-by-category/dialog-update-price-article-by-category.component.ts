import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticlePriceUpdateByCategory } from 'src/app/models/Article/ArticlePriceUpdateByCategory';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-dialog-update-price-article-by-category',
  templateUrl: './dialog-update-price-article-by-category.component.html',
  styleUrls: ['./dialog-update-price-article-by-category.component.css']
})
export class DialogUpdatePriceArticleByCategoryComponent implements OnInit {
  articlePriceUpdate: ArticlePriceUpdateByCategory = new ArticlePriceUpdateByCategory();
  categories: Array<Category> = [];

  constructor(public dialogRef: MatDialogRef<DialogUpdatePriceArticleByCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoryService, 
    private _articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  onClick(){
    if(this.isValid()){

      this._articleService.updatePriceByCategory(this.articlePriceUpdate).subscribe({
        next: (res)=>{
          if(res.error){
            console.log("error");
            AlertService.errorAlert('!Error!',"Error al intentar actualizar el precio de los articulos.")
          }else{
            AlertService.successAlert('¡Actualizado!',"El precio de los articulos ha sido actualizado.")
            .then((result) => {
              // Cierra el dialogo.
              this.dialogRef.close();
            }); 
          }
        },
        error: (err) => {
          console.log(err)
          AlertService.errorAlert('!Error!',"Error al intentar actualizar el precio de los articulos.")
        }
      });

    }
    else{
      AlertService.errorAlert('!Revise los datos!',"Debe seleccionar una categoria.")
    }
  }

  closeModal(){
    this.dialogRef.close();
  }

  loadCategories() {
    this._categoryService.categories.subscribe({
      next: res => {
        this.categories = res;
      }
    })
  }


  isValid(): boolean{
    return this.articlePriceUpdate.categoryId !== 0
  }
}
