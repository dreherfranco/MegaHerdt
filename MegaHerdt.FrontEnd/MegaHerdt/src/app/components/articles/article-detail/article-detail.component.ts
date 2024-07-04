import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article = new Article();
  articleId: number | null = null;

  constructor(private _articleService: ArticleService, 
    private _route: ActivatedRoute) { }

  ngOnInit(): void 
  {
    // Se subscribe a los parametros para detectar si hay cambios y cargar
    // los datos del articulo cada vez que cambia el id de articulo en la url
    this.subscribeParams();
  }

   /**
   * Se subscribe a params para escuchar cambios de articleId en la url
   */
   subscribeParams(){
    this._route.params.subscribe(params => {
      const articleId = +params['articleId']; // Convierte el valor en número
      if (!isNaN(articleId)) 
      {
        this.articleId = articleId;
        if(this.articleId != null)
        {
          this.getArticleById(this.articleId);
        }
      }
    });
  }

  getArticleById(articleId: number){
    this._articleService.getById(articleId).subscribe({
      next: result => 
      {
        this.article=result;
      }
    })
  }

}
