import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article = new Article();
  articleId: number | null = null;

  constructor(private _articleService: ArticleService, 
    private _route: ActivatedRoute,
    private _cartService: CartService) { }

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

  isOnOffer(article: Article): boolean{
    return article.unitValueWithOffer < article.unitValue;
  }

  addToCart(){
    var purchaseArticle = new PurchaseArticleCreation(this.article.id, 1, this.article.unitValueWithOffer, this.article.name);
    this._cartService.addToCart(this.article, purchaseArticle);
  }

  formatoArgentino(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }

  getStyle(){
    return{
      color: (this.article.stock>20) ? '#00A02F' :
              (this.article.stock>5)  ? '#BE8C08' : 'red',
      display: (this.article.stock<1) ? "none" : "block",
    }
  }
  
}
