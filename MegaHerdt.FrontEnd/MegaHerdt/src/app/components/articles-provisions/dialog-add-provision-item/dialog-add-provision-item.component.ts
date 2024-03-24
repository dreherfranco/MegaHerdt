import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ArticleProviderItem } from 'src/app/models/ArticleProvider/ArticleProviderItem';
import { ArticleProviderSerialNumber } from 'src/app/models/ArticleProviderSerialNumber/ArticleProviderSerialNumber';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-dialog-add-provision-item',
  templateUrl: './dialog-add-provision-item.component.html',
  styleUrls: ['./dialog-add-provision-item.component.css']
})
export class DialogAddProvisionItemComponent implements OnInit {
  articles: Array<ArticleName>;
  articleProviderItem: ArticleProviderItem;
  serialNumberToAdd: string = '';
  
  constructor(public dialogRef: MatDialogRef<DialogAddProvisionItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _articleService: ArticleService) 
    {
      this.articles = new Array<ArticleName>();
      this.articleProviderItem = new ArticleProviderItem();
    }

  ngOnInit(): void {
    this.loadArticles();
  }

  confirm(){
    this.dialogRef.close(this.articleProviderItem);
  }

  closeModal(){
    this.dialogRef.close();
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

  addSerialNumber(){
    let newSerialNumber = this.serialNumberToAdd;
    if(newSerialNumber !== "" && this.articleProviderItem.articleQuantity >= this.articleProviderItem.serialNumbers.length){
      this.articleProviderItem.serialNumbers.push(new ArticleProviderSerialNumber(newSerialNumber));
      this.serialNumberToAdd = '';
    }
  }

}
