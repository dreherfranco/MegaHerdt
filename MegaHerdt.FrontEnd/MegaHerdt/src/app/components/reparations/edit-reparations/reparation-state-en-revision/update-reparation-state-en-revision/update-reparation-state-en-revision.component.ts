import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleName } from 'src/app/models/Article/ArticleName';
import { ReparationArticle } from 'src/app/models/Article/ReparationArticle';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { Reparation } from 'src/app/models/Reparation/Reparation';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-update-reparation-state-en-revision',
  templateUrl: './update-reparation-state-en-revision.component.html',
  styleUrls: ['./update-reparation-state-en-revision.component.css']
})
export class UpdateReparationStateENREVISIONComponent implements OnInit {
  articles: Array<ArticleName>;
  reparationArticle: ReparationArticle;
  paginate: Paginate;

  constructor(private _articleService: ArticleService,
    public dialogRef: MatDialogRef<UpdateReparationStateENREVISIONComponent>,
    @Inject(MAT_DIALOG_DATA) public reparation: Reparation) { 
    this.reparation.reparationsArticles = [];
    this.articles = new Array<ArticleName>();
    this.reparationArticle = new ReparationArticle(0,1,0,"");
    this.paginate = new Paginate(1,2);
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  confirm(){
    this.dialogRef.close(this.reparation);
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

  addArticleReparation() {
    var articleName = "";
    //buscar el articulo para extraer el nombre
    for (let article of this.articles) {
      if (article.id == this.reparationArticle.articleId)
        articleName = article.name;
    }
    var reparationArticle = new ReparationArticle(this.reparationArticle.articleId, this.reparationArticle.articleQuantity,0,articleName);
    this.reparation.reparationsArticles.push(reparationArticle);
  }
}
