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

  setSelectedArticle(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    // tengo que cortar el valor recibido porque viene un valor sucio con los ":" en el string
    const articleId = selectElement.value.split(":")[1].trim();

    // Encuentra el artículo seleccionado en el arreglo de artículos
    const selectedArticle = this.articles.find(article => article.id === Number(articleId));
    

    // Verifica si se encontró un artículo
    if (selectedArticle !== undefined) {
      // Asigna el artículo seleccionado al artículo del proveedor
      this.articleProviderItem.article = selectedArticle;
    } else {
      // Si no se encontró ningún artículo, puedes manejarlo de alguna manera, por ejemplo, mostrando un mensaje de error o tomando alguna acción alternativa.
      console.log("No se encontró ningún artículo con el ID especificado.");
    }
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
