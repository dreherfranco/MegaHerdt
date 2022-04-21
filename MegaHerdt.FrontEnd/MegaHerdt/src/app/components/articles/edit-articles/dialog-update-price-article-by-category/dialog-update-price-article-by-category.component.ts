import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticlePriceUpdateByCategory } from 'src/app/models/Article/ArticlePriceUpdateByCategory';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-dialog-update-price-article-by-category',
  templateUrl: './dialog-update-price-article-by-category.component.html',
  styleUrls: ['./dialog-update-price-article-by-category.component.css']
})
export class DialogUpdatePriceArticleByCategoryComponent implements OnInit {
  articlePriceUpdate: ArticlePriceUpdateByCategory = new ArticlePriceUpdateByCategory();

  constructor(public dialogRef: MatDialogRef<DialogUpdatePriceArticleByCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoryService
    ) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.data);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
