import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-offcanva',
  templateUrl: './cart-offcanva.component.html',
  styleUrls: ['./cart-offcanva.component.css']
})
export class CartOffcanvaComponent implements OnInit {
  cartArticles: Array<CartArticleDetail>;
  total: number;

  constructor(private _cartService: CartService, private router: Router) {
    this.cartArticles = new Array<CartArticleDetail>();
    this.total = 0;
  }

  ngOnInit(): void {
    this._cartService.cartArticlesDetails.subscribe({
      next: result => {this.cartArticles = result}
    });
    
    this._cartService.total.subscribe({
      next: result => this.total = result
    });
  }
  emptyCart(){
    this._cartService.emptyCart();
  }
  formatoArgentino(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }

  removeArticle(cartArticleDetail: CartArticleDetail) {
    this._cartService.removeArticleFromCart(cartArticleDetail.article);
  }

}
