import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  cartArticles: Array<CartArticleDetail>;

  constructor(private _articleService: ArticleService, private _cartService: CartService) 
  { 
    this.paginate = new Paginate(1,6);
    this.searchText = "";
    this.cartArticles = this._cartService.getCart();
  }

  ngOnInit(): void {
    this.loadProducts();
    this._cartService.cartArticlesDetails.subscribe({
      next: result => 
      {
        this.cartArticles=result
      }
    })
    this._cartService.articles.subscribe({
      next: result=>{ this.articles = result }
    })
  }

  loadProducts(){
    this._articleService.getArticles().subscribe(
      {
        next: (response) => 
        {
          this.articles = response;
          this._cartService.setArticles(this.articles);
        },
        error: (err) => console.log(err)
      }
    );
    
  }
}
