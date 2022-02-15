import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ArticleService} from '../../../services/articles/article.service';
import { Article } from '../../../models/Article/Article';
import { Paginate } from '../../../models/Paginate/Paginate';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  paginate: Paginate;
  searchText: string;
  @Output() cartEvent = new EventEmitter<Array<CartArticleDetail>>();
  @Output() articlesEvent = new EventEmitter<Article[]>();

  constructor(private _articleService: ArticleService, private _cartService: CartService) 
  { 
    this.paginate = new Paginate(1,6);
    this.searchText = "";
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this._articleService.getArticles().subscribe(
      {
        next: (response) => 
        {
          this.articles = response;
          this.updateArticlesStock();
          this.emitArticlesEvent();
        },
        error: (err) => console.log(err)
      }
    );
    
  }

  updateArticlesStock(){
    var cartArticles: Array<CartArticleDetail> = this._cartService.getCart();
    for(var i=0; i < this.articles.length; i++){
      for(var j=0; j < cartArticles.length; j++){       
        if(this.articles[i].id == cartArticles[j].article.id){
          this.articles[i].stock = (this.articles[i].stock - cartArticles[j].purchaseArticle.articleQuantity);
        }
      }      
    }
  }

  emitCartEvent(cartArticleDetail: Array<CartArticleDetail>){
    this.cartEvent.emit(cartArticleDetail);
    this.emitArticlesEvent();
  }

  emitArticlesEvent(){
    this.articlesEvent.emit(this.articles);
  }
}
