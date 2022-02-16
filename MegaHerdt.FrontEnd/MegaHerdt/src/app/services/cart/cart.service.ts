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

  AddToCart(article: Article, purchaseArticle: PurchaseArticleCreation){
    if(this.availableStock(article)){
      var cartArticlesDetails: Array<CartArticleDetail> = this.getCart();
      var cartArticleDetail = new CartArticleDetail(article, purchaseArticle);
      if(this.existsArticleInCartArticleDetail(article)){       
        for(var i=0; i<cartArticlesDetails.length; i++){
          if(cartArticlesDetails[i].article.id == article.id){
            cartArticlesDetails[i].purchaseArticle.articleQuantity++;
          }
        }
      }else if(cartArticlesDetails == null){
        cartArticlesDetails = new Array<CartArticleDetail>(); 
        cartArticlesDetails.push(cartArticleDetail);
      }
      else{
        cartArticlesDetails.push(cartArticleDetail);
      }

      localStorage.setItem('cart', JSON.stringify(cartArticlesDetails));
    }
  }

  removeUnits(article: Article){
    var cartArticlesDetails: Array<CartArticleDetail> = this.getCart();
    for(var i=0; i<cartArticlesDetails.length; i++){
      if(cartArticlesDetails[i].article.id == article.id){
        cartArticlesDetails = this.verifyAndRemoveUnits(cartArticlesDetails, i);
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartArticlesDetails));
  }

  verifyAndRemoveUnits(cartArticlesDetails: Array<CartArticleDetail>, index: number): Array<CartArticleDetail>{
    if(cartArticlesDetails[index].purchaseArticle.articleQuantity > 0){
      --cartArticlesDetails[index].purchaseArticle.articleQuantity;
      if(cartArticlesDetails[index].purchaseArticle.articleQuantity == 0){
        //remove from cart
        cartArticlesDetails.splice(index,1);
      }
    }
    return cartArticlesDetails;
  }
  /**
   * 
   * @returns Array<Article> || null
   */
  getCart(): any{
    var articlesDetail = localStorage.getItem('cart');
    if(articlesDetail != null){
     this.cartArticlesDetails = JSON.parse(articlesDetail);
     return this.cartArticlesDetails;
    }else { 
      console.log("no existen articulos en el carrito");
    }
  }

  existsArticleInCartArticleDetail(articleDetail: Article): boolean{
    var cartArticlesDetails: Array<CartArticleDetail> = this.getCart();
    if(cartArticlesDetails != null){
      for(var i=0; i<cartArticlesDetails.length; i++){
        if(cartArticlesDetails[i].article.id == articleDetail.id){       
          return true;
        }
      }
    }
    return false;   
  }

  isEmpty(): boolean{
    return localStorage.getItem("cart") == null || localStorage.getItem("cart") == 'undefined';
  }

  availableStock(article: Article): boolean{
    return article.stock > 0;
  }
  
  availableStockCart(article: Article, purchaseArticle: PurchaseArticleCreation): boolean{
    return article.stock - purchaseArticle.articleQuantity > 0 ;
  }

  emptyCart(): void{
    localStorage.removeItem("cart");
  }

  getTotal(cartArticles: Array<CartArticleDetail>){
    var total = 0;
    for(var i=0; i< cartArticles.length; i++){
      total += (cartArticles[i].purchaseArticle.articleQuantity * cartArticles[i].purchaseArticle.priceAtTheMoment);
    }
    return total;
  }
}
