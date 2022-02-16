import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartArticles: Array<CartArticleDetail>;
  articles: Article[] = [];
  total: number;

  constructor(private _cartService: CartService) {
    this.cartArticles = new Array<CartArticleDetail>();
    this.total = 0;
   }

  ngOnInit(): void {
    
  }
  
  receiveCartEvent(cartArticleDetail: Array<CartArticleDetail>){
    this.cartArticles = cartArticleDetail;
  }

  receiveArticlesEvent(articles: Article[]){
    this.articles = articles;
  }

  receiveEmptyCartEvent(articles: Article[]){
    this.articles = articles;
  }

  receiveTotalEvent(){
    this.total = this._cartService.getTotal(this.cartArticles);
  }
}
