import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ArticlesFilterByEnum } from 'src/app/utils/ArticlesFilterByEnum';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article = new Article();
  articleId: number | null = null;
  cartArticles: Array<CartArticleDetail>;

  constructor(private _articleService: ArticleService, 
    private _route: ActivatedRoute,
    private _cartService: CartService) 
    { 
        this.cartArticles = this._cartService.getCart();
    }

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
          this.loadCartAndArticles(this.articleId);
        }
      }
    });
  }

  loadCartAndArticles(articleId: number){
    this._cartService.setFilterBy(ArticlesFilterByEnum.GET_BY_ID, articleId);
    this._cartService.cartArticlesDetails.subscribe({
      next: result => 
      {
        this.cartArticles=result;               
      }
    })
    this._cartService.articles.subscribe({
      next: result=>
      { 
        var article = result.find(art => art.id == articleId) 
        console.log(article)
        if(article !== undefined)
        {
          this.article = article;
        }
      }
    })
  }
  
  getArticleById(articleId: number){
    this._articleService.getById(articleId).subscribe(
      {
        next: (response) => 
        {
          this.article = response;
          /** Actualiza el stock en los articulos segun los articulos cargados en el carrito */
          this._cartService.setArticle(this.article);

        },
        error: (err) => console.log(err)
      }
    );
    
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
