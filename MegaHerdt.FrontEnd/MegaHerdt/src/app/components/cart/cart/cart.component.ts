import { Component, OnInit } from '@angular/core';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartArticles: Array<CartArticleDetail>;
  total: number;

  constructor(private _cartService: CartService) {
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

}
