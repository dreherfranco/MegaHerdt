import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-articles-by-brand',
  templateUrl: './articles-by-brand.component.html',
  styleUrls: ['./articles-by-brand.component.css']
})
export class ArticlesByBrandComponent implements OnInit {
  articles: Article[] = [];
  paginate: Paginate;
  searchText: string;
  cartArticles: Array<CartArticleDetail>;
  isLoading: boolean = true;
  brandId: number = 0;

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
      }
    });
  }


  loadCartArticlesAndDetails(){
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
    
    this._articleService.getArticlesByBrand(this.brandId).subscribe(
      {
        next: (response) => 
        {
          this.articles = response;
        },
        error: (err) => console.log(err)
      }
    );
    
  }
}
