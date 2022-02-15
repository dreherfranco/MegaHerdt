import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartArticles: Array<CartArticleDetail>;
  articles: Article[] = [];

  constructor() {
    this.cartArticles = new Array<CartArticleDetail>();
   }

  ngOnInit(): void {
    
  }
  
  receiveCartEvent(cartArticleDetail: Array<CartArticleDetail>){
    this.cartArticles = cartArticleDetail;
  }

  receiveArticlesEvent(articles: Article[]){
    this.articles = articles;
  }
}
