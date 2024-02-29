import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ArticlesFilterByEnum } from 'src/app/utils/ArticlesFilterByEnum';

@Component({
  selector: 'app-articles-in-offer',
  templateUrl: './articles-in-offer.component.html',
  styleUrls: ['./articles-in-offer.component.css']
})
export class ArticlesInOfferComponent implements OnInit {
  paginate: Paginate;
  cartArticles: Array<CartArticleDetail>;
  brandId: number = 0;

  @Input() searchText: string;
  @Input() articles: Article[] = [];
  @Output() uploadCompleted: EventEmitter<Article[]> = new EventEmitter<Article[]>();

  constructor(private _articleService: ArticleService, 
    private _cartService: CartService) 
  { 
    this.paginate = new Paginate(1,6);
    this.searchText = "";
    this.cartArticles = this._cartService.getCart();
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartArticlesAndDetails();
  }

  loadCartArticlesAndDetails(){
    // Determina como va a filtrar los articulos del carrito
    this._cartService.setFilterBy(ArticlesFilterByEnum.ON_OFFER);

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
    this._articleService.getArticlesOnOffer().subscribe(
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
