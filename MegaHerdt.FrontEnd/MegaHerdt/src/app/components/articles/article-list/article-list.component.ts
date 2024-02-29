import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from '../../../services/articles/article.service';
import { Article } from '../../../models/Article/Article';
import { Paginate } from '../../../models/Paginate/Paginate';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { ArticlesFilterByEnum } from 'src/app/utils/ArticlesFilterByEnum';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  paginate: Paginate;
  cartArticles: Array<CartArticleDetail>;
  paginationRange: number = 8;

  @Input() articles: Article[] = [];
  @Input() searchText: string;
  @Output() uploadCompleted: EventEmitter<Article[]> = new EventEmitter<Article[]>();

  constructor(private _articleService: ArticleService, 
    private _cartService: CartService) 
  { 
    this.paginate = new Paginate(1,this.paginationRange);
    this.searchText = "";
    this.cartArticles = this._cartService.getCart();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartAndArticles();
  }

  loadCartAndArticles(){
    this._cartService.setFilterBy(ArticlesFilterByEnum.GET_ALL);
    this._cartService.cartArticlesDetails.subscribe({
      next: result => 
      {
        this.cartArticles=result;               
      }
    })
    this._cartService.articles.subscribe({
      next: result=>{ this.articles = result }
    })
  }

  loadProducts(){
    this._articleService.getAllEnableds().subscribe(
      {
        next: (response) => 
        {
          this.articles = response;
          /** Actualiza el stock en los articulos segun los articulos cargados en el carrito */
          this._cartService.setArticles(this.articles);
          this.uploadCompleted.emit(this.articles);
        },
        error: (err) => console.log(err)
      }
    );
    
  }
}
