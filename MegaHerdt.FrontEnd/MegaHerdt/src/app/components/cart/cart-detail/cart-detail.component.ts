import { Component, OnInit } from '@angular/core';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartArticles: Array<CartArticleDetail> = []; 
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.cartArticles = this._cartService.getCartFromStorage();
  }

}
