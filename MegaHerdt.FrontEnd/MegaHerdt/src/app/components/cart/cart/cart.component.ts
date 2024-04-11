import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchasePaymentConfirm } from 'src/app/models/Payment/PurchasePaymentConfirm';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { CartService } from 'src/app/services/cart/cart.service';
import { PurchasePaymentService } from 'src/app/services/purchase-payments/purchase-payment.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartArticles: Array<CartArticleDetail>;
  total: number;

  constructor(private _cartService: CartService, 
              private _router: Router,
              private _storageService: StorageService,
              private _PurchasePaymentService: PurchasePaymentService) 
  {
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

  ngOnDestroy(): void {
  }
  
  emptyCart(){
    this._cartService.emptyCart();
  }


  reservedPurchase(){
    console.log("Reservar la compra");
    var identity = this._storageService.getIdentity();
    let purchaseReserved = new PurchasePaymentConfirm();
    purchaseReserved.clientEmail = identity.email;
    purchaseReserved.clientId = identity.id;
    purchaseReserved.payInPerson = true;

    this._PurchasePaymentService.purchaseReserved(purchaseReserved, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          AlertService.errorAlert('¡Error al intentar reservar la compra!');
        }else{
          AlertService.successAlert('¡Reservada!','Los articulos fueron reservados para su compra')
          .then((result) => {
            this.emptyCart();
            window.location.href = window.paymentSuccessRedirect;
            this._cartService.updateCartArticlesDetails([]);
           // window.location.reload();
            //this.ngOnDestroy()
          });;
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar reservar la compra!');
        console.log(err)
      }
    })
  }

}
