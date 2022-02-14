import { Injectable } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartArticles: Array<PurchaseArticleCreation>;
  cartArticlesDetails: Array<Article>;
  constructor() { 
    this.cartArticles = new Array<PurchaseArticleCreation>();
    this.cartArticlesDetails = new Array<Article>();
  }

  setCartArticlesDetail(article: Article, purchaseArticle: PurchaseArticleCreation){
    var cartArticlesDetails: Array<CartArticleDetail> = this.getCartArticlesDetail();
    var cartArticleDetail = new CartArticleDetail(article, purchaseArticle);
    if(this.existsArticleInCartArticleDetail(article)){
      var purchasesArticles: Array<PurchaseArticleCreation> = this.getCart();
      //sumar una unidad al articulo
      for(var j=0; j<purchasesArticles.length; j++){
        if(purchasesArticles[j].articleId == article.id){
          for(var i=0; i<cartArticlesDetails.length; i++){
            var articleDetail = cartArticlesDetails[i];
            if(articleDetail.purchaseArticle.articleId == article.id){
              cartArticlesDetails[i].purchaseArticle.articleQuantity = purchasesArticles[j].articleQuantity;            
            }
          }
        }
      }
    }else if(cartArticlesDetails == null){
      cartArticlesDetails = new Array<CartArticleDetail>();  
      cartArticlesDetails.push(cartArticleDetail);
    }
    else{
      cartArticlesDetails.push(cartArticleDetail);
    }

    localStorage.setItem('cartArticlesDetails', JSON.stringify(cartArticlesDetails));
  }

  /**
   * 
   * @returns Array<Article> || null
   */
  getCartArticlesDetail(): any{
    var articlesDetail = localStorage.getItem('cartArticlesDetails');
    if(articlesDetail != null){
     this.cartArticlesDetails = JSON.parse(articlesDetail);
     return this.cartArticlesDetails;
    }else { 
      console.log("no existen articulos en el carrito");
    }
  }

  setCart(purchaseArticle: PurchaseArticleCreation){ 
    if(!this.existsArticleInCart(purchaseArticle)){
      var cartArticles = this.getCart();
      if(cartArticles == null){
        cartArticles = new Array<PurchaseArticleCreation>();   
      }
      cartArticles.push(purchaseArticle);
      localStorage.setItem('cartArticles', JSON.stringify(cartArticles));
    }
  }

  /**
   * 
   * @returns Array<PurchaseArticleCreation> || null
   */
  getCart(): any{
    var cartArticles = localStorage.getItem('cartArticles');
    if(cartArticles != null){
     this.cartArticles = JSON.parse(cartArticles);
     return this.cartArticles;
    }else { 
      console.log("no existen articulos en el carrito"); 
    }
    return this.cartArticles;
  }

  existsArticleInCart(purchaseArticle: PurchaseArticleCreation): boolean{
    var cartArticles: Array<PurchaseArticleCreation> = this.getCart();
    if(cartArticles != null){
      for(var i=0; i<cartArticles.length; i++){
        if(cartArticles[i].articleId == purchaseArticle.articleId){
          ++cartArticles[i].articleQuantity;
          localStorage.setItem('cartArticles', JSON.stringify(cartArticles));        
          return true;
        }
      }
    }
    return false;
  }

  existsArticleInCartArticleDetail(articleDetail: Article): boolean{
    var cartArticlesDetails: Array<CartArticleDetail> = this.getCartArticlesDetail();
    if(cartArticlesDetails != null){
      for(var i=0; i<cartArticlesDetails.length; i++){
        if(cartArticlesDetails[i].article.id == articleDetail.id){       
          return true;
        }
      }
    }
    return false;   
  }
}
