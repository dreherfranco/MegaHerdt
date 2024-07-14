import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-dialog-add-reparation-articles',
  templateUrl: './dialog-add-reparation-articles.component.html',
  styleUrls: ['./dialog-add-reparation-articles.component.css']
})
export class DialogAddReparationArticlesComponent implements OnInit {
  articles: Array<ArticleName>;
  isNewItem: boolean;
  reparationArticle: ReparationArticle = new ReparationArticle();

  constructor(public dialogRef: MatDialogRef<DialogAddReparationArticlesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _articleService: ArticleService) 
    {
      this.articles = new Array<ArticleName>();
      this.isNewItem = data.reparationArticle == null; // Determina si es un nuevo ítem

      if (!this.isNewItem)
      {
        this.reparationArticle = data.reparationArticle as ReparationArticle; // Si no es nuevo, carga el ítem existente
      }
    }

  ngOnInit(): void {
    this.loadArticles();
  }

  disableAcceptButton(){
    if(this.reparationArticle.articleId == 0 || this.reparationArticle.articleQuantity <= 0)
    {
      return true;
    }
    return false;
  }

  confirm(){
    var articleName = "";
    var reparationArticle;
    //buscar el articulo para extraer el nombre
    for (let article of this.articles) {
      if (article.id == this.reparationArticle.articleId)
      {
        articleName = article.name;
        reparationArticle = new ReparationArticle(this.reparationArticle.articleId, this.reparationArticle.articleQuantity,0,articleName);
        //this.reparation.reparationsArticles.push(reparationArticle);
      }
    }
     this.dialogRef.close(reparationArticle);
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
          // Filtrar artículos que no están en articlesUsedIds
          this.articles = this.articles.filter(a => !this.data.articlesUsedIds.includes(a.id));       
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
