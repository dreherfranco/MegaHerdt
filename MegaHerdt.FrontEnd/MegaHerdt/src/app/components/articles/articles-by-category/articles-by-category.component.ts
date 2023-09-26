import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { Paginate } from 'src/app/models/Paginate/Paginate';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-articles-by-category',
  templateUrl: './articles-by-category.component.html',
  styleUrls: ['./articles-by-category.component.css']
})
export class ArticlesByCategoryComponent implements OnInit {
  articles: Article[] = [];
  paginate: Paginate;
  searchText: string;
  cartArticles: Array<CartArticleDetail>;
  isLoading: boolean = true;
  categoryId: number = 0;

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
      const numero = +params['categoryId']; // Convierte el valor en número
      if (!isNaN(numero)) {
        this.categoryId = numero;
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

    this._articleService.getArticlesByCategory(this.categoryId).subscribe(
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
