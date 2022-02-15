import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cartArticles: Array<CartArticleDetail>;
  @Input() articles: Article[] = [];
  total: number;
  
  constructor(private _cartService: CartService) {
    this.cartArticles = new Array<CartArticleDetail>();
    this.total = 0;
   }

  ngOnInit(): void {
    this.cartArticles = this._cartService.getCart();
    this.setTotal();
  }

  deleteCartArticle(index: number){

  }

  setTotal(){
    for(var i=0; i< this.cartArticles.length; i++){
      this.total += (this.cartArticles[i].purchaseArticle.articleQuantity * this.cartArticles[i].purchaseArticle.priceAtTheMoment);
    }
  }
  
  emptyCart(){
    this._cartService.emptyCart();
  }

  receiveCartEvent(cartArticleDetail: Array<CartArticleDetail>){
    this.cartArticles = cartArticleDetail;
  }

  removeArticleFromCart(cartArticleDetail: CartArticleDetail){
    if(cartArticleDetail.purchaseArticle.articleQuantity == 0){
      for(var i=0; i<this.cartArticles.length; i++){
        if(this.cartArticles[i].article.id == cartArticleDetail.article.id){
          this.cartArticles.splice(i,1);
        }
      }
    }
  }

}
