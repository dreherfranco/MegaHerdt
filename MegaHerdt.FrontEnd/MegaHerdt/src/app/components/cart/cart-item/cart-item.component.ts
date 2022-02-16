import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/Article/Article';
import { Brand } from 'src/app/models/ArticleBrand/Brand';
import { Category } from 'src/app/models/ArticleCategory/Category';
import { ArticleOfferDetail } from 'src/app/models/ArticleOffer/ArticleOfferDetail';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartArticle: CartArticleDetail;
  @Output() removeArticleEvent = new EventEmitter<CartArticleDetail>();
  @Input() articles: Article[] = [];
  @Output() totalEvent = new EventEmitter();

  constructor(private _cartService: CartService) {
    this.cartArticle = new CartArticleDetail(new Article(0, '', '', 0, '', 0, 0, new Brand(0, ''), new Category(0, ''), new Array<ArticleOfferDetail>(), new Array<ArticleOfferDetail>()), new PurchaseArticleCreation(0, 0, 0))
  }

  ngOnInit(): void {
  }

  addToCart(article: Article, purchaseArticle: PurchaseArticleCreation) {
    if (this._cartService.availableStockCart(article, purchaseArticle)) {
      this._cartService.AddToCart(article, purchaseArticle);
      ++this.cartArticle.purchaseArticle.articleQuantity;
      
      //update article in home view
      for (var i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id == this.cartArticle.article.id) {
          --this.articles[i].stock;
          this.totalEvent.emit();
        }
      }

    }
  }

  removeUnits(cartArticleDetail: CartArticleDetail) {
    this._cartService.removeUnits(cartArticleDetail.article);
    if (cartArticleDetail.purchaseArticle.articleQuantity > 0) {
      --this.cartArticle.purchaseArticle.articleQuantity;
      this.removeArticleEvent.emit(this.cartArticle);
      this.totalEvent.emit();
      
      //update article in home view
      for (var i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id == this.cartArticle.article.id) {
          ++this.articles[i].stock;
        }
      }
      
    }
  }
}
