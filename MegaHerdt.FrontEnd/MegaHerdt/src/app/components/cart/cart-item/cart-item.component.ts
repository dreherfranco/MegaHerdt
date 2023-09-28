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

  constructor(private _cartService: CartService) {
    this.cartArticle = new CartArticleDetail(new Article(0, '', '', 0, '', 0, 0, new Brand(0, ''), new Category(0, ''), new Array<ArticleOfferDetail>(), new Array<ArticleOfferDetail>()), new PurchaseArticleCreation(0, 0, 0, ''))
  }

  ngOnInit(): void {
  }

  addToCart(article: Article, purchaseArticle: PurchaseArticleCreation) {
    if (this._cartService.availableStockCart(article, purchaseArticle)) {   
      this._cartService.addToCart(article, purchaseArticle);
    }
  }

  removeUnits(cartArticleDetail: CartArticleDetail) {
    this._cartService.removeUnitsFromCart(cartArticleDetail.article);
  }

  formatoArgentino(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }
}
