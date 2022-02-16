import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cartArticles: Array<CartArticleDetail>;
  @Input() articles: Article[] = [];
  @Output() emptyCartEvent = new EventEmitter<Array<Article>>();
  @Input() total: number;
  
  constructor(private _cartService: CartService, private _articleService: ArticleService) {
    this.cartArticles = new Array<CartArticleDetail>();
    this.total = 0;
   }

  ngOnInit(): void {
    this.cartArticles = this._cartService.getCart();
    this.total = this._cartService.getTotal(this.cartArticles);
  }

  deleteCartArticle(index: number){

  }
  
  emptyCart(){
    this._cartService.emptyCart();
    this.cartArticles = [];
    this._articleService.getArticles().subscribe({
      next: result =>{
        this.articles = result;
        this.emptyCartEvent.emit(this.articles);
      }
    })

  }

  receiveCartEvent(cartArticleDetail: Array<CartArticleDetail>){
    this.cartArticles = cartArticleDetail;
  }

  removeArticleFromCart(cartArticleDetail: CartArticleDetail){
    if(cartArticleDetail.purchaseArticle.articleQuantity == 0){
      for(var i=0; i<this.cartArticles.length; i++){
        if(this.cartArticles[i].article.id == cartArticleDetail.article.id){
          this.cartArticles.splice(i,1);
        }
      }
    }
  }

  receiveTotalEvent(){
    this.total = this._cartService.getTotal(this.cartArticles);
  }
}
