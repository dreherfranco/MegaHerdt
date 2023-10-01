import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ArticlesFilterByEnum } from 'src/app/utils/ArticlesFilterByEnum';

@Component({
  selector: 'app-articles-in-offer',
  templateUrl: './articles-in-offer.component.html',
  styleUrls: ['./articles-in-offer.component.css']
})
export class ArticlesInOfferComponent implements OnInit {

  articles: Article[] = [];
  paginate: Paginate;
  searchText: string;
  cartArticles: Array<CartArticleDetail>;
  isLoading: boolean = true;
  brandId: number = 0;

  constructor(private _articleService: ArticleService, 
    private _cartService: CartService,
    private _router: Router) 
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
        this.isLoading = false;
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

          if(this.articles.length === 0){
            AlertService.warningAlertAdvice('¡No hay ofertas disponibles por el momento!')
            .then((result) => {
              this._router.navigate(['']);
            });
          }
        },
        error: (err) => console.log(err)
      }
    );
    
  }

}
