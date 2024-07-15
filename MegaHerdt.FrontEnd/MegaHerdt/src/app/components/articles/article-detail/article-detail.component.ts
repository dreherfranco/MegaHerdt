import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchasePaymentConfirm } from 'src/app/models/Payment/PurchasePaymentConfirm';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { PurchasePaymentService } from 'src/app/services/purchase-payments/purchase-payment.service';
import { StorageService } from 'src/app/services/storage/storage.service';
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
  stockAdd: number;

  constructor(private _articleService: ArticleService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private _cartService: CartService,
    private _storageService: StorageService,
    private _PurchasePaymentService: PurchasePaymentService 
  ) 
    { 
      this.stockAdd = 1;
      this.cartArticles = this._cartService.getCart();
    }

  ngOnInit(): void 
  {
    // Se subscribe a los parametros para detectar si hay cambios y cargar
    // los datos del articulo cada vez que cambia el id de articulo en la url
    this.subscribeParams();
  }

  removeUnits(){
    if(this.stockAdd > 1)
      this.stockAdd = this.stockAdd - 1;
  }

  addUnits(){
    if(this.stockAdd < this.article.stock)
      this.stockAdd = this.stockAdd + 1;
  }

  reservedPurchase(){
    console.log("Reservar la compra");
    var identity = this._storageService.getIdentity();
    let purchaseReserved = new PurchasePaymentConfirm();
    purchaseReserved.clientEmail = identity.email;
    purchaseReserved.clientId = identity.id;
    purchaseReserved.payInPerson = true;
    purchaseReserved.purchaseArticles = [{
      articleId: this.article.id,
      articleName: this.article.name,
      articlePriceAtTheMoment: (this.isOnOffer(this.article) ? this.article.unitValueWithOffer : this.article.unitValue),
      articleQuantity: this.stockAdd,
    }];

    if(purchaseReserved.purchaseArticles.length > 0)
    {
      this._PurchasePaymentService.purchaseReserved(purchaseReserved, this._storageService.getTokenValue()).subscribe({
        next: (response) =>{
          if(response.error){
            AlertService.errorAlert('¡Error al intentar reservar la compra!');
          }else{
            AlertService.successAlert('¡Reservada!','Los articulos fueron reservados para su compra')
            .then(() => {
              this._router.navigate(['/purchases/record']);
            });
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar reservar la compra!');
          console.log(err)
        }
      })
    }
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
    if(this.article.stock < 1)
      return;

    var purchaseArticle = new PurchaseArticleCreation(this.article.id, this.stockAdd, this.article.unitValueWithOffer, this.article.name);
    this._cartService.addToCart(this.article, purchaseArticle);

    setTimeout(() => {this._router.navigate([''])}, 1000);
  }

  getStyle(){
    return{
      color: (this.article.stock>20) ? '#00A02F' :
              (this.article.stock>5)  ? '#BE8C08' : 'red',
      display: (this.article.stock<1) ? "none" : "block",
    }
  }
  
}
