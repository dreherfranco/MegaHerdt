import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ArticlesFilterByEnum } from 'src/app/utils/ArticlesFilterByEnum';

@Component({
  selector: 'app-articles-by-brand',
  templateUrl: './articles-by-brand.component.html',
  styleUrls: ['./articles-by-brand.component.css']
})
export class ArticlesByBrandComponent implements OnInit {
  paginate: Paginate;
  cartArticles: Array<CartArticleDetail>;
  brandId: number = 0;
  
  @Input() searchText: string;
  @Input() articles: Article[] = [];
  @Output() uploadCompleted: EventEmitter<Article[]> = new EventEmitter<Article[]>();

  constructor(private _articleService: ArticleService, 
    private _cartService: CartService,
    private _route: ActivatedRoute) 
  { 
    this.paginate = new Paginate(1,6);
    this.searchText = "";
    this.cartArticles = this._cartService.getCart();
  }

  ngOnInit(): void {
    this.subscribeParams();
    this.loadCartArticlesAndDetails();
  }

  /**
   * Se subscribe a params para escuchar cambios de brandId en la url
   */
  subscribeParams(){
    this._route.params.subscribe(params => {
      const numero = +params['brandId']; // Convierte el valor en número
      if (!isNaN(numero)) {
        this.brandId = numero;
        this.loadProducts();

        /**  
         * Determina como va a filtrar los articulos del carrito
         * El parametro 'numero' representa el id de categoria 
         * por el cual va a filtrar los articulos
         */
        this._cartService.setFilterBy(ArticlesFilterByEnum.BRAND, numero);
      }
    });
  }


  loadCartArticlesAndDetails(){
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
    
    this._articleService.getArticlesByBrand(this.brandId).subscribe(
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
