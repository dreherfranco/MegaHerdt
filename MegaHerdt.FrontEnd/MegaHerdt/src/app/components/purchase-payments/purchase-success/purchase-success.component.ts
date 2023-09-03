import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.component.html',
  styleUrls: ['./purchase-success.component.css']
})
export class PurchaseSuccessComponent implements OnInit {

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    // Una vez terminada la compra se limpia el carrito.
    this._cartService.emptyCart();
  }

}
