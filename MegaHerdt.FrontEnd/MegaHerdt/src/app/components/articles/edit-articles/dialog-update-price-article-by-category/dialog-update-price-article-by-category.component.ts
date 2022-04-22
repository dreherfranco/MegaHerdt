import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticlePriceUpdateByCategory } from 'src/app/models/Article/ArticlePriceUpdateByCategory';
import { Category } from 'src/app/models/ArticleCategory/Category';
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
  categoryId: number = 0;
  statusSubmit: string = '';

  constructor(public dialogRef: MatDialogRef<DialogUpdatePriceArticleByCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoryService, 
    private _articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  onClick(){
    //this.dialogRef.close(this.data);
    this._articleService.updatePriceByCategory(this.articlePriceUpdate).subscribe({
      next: (res)=>{
        if(res.error){
          console.log("error");
          this.statusSubmit = "failed";
        }else{
          this.statusSubmit = "success";
        }
      },
      error: (err) => {
        console.log(err)
        this.statusSubmit = "failed";
      }
    });
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
}
