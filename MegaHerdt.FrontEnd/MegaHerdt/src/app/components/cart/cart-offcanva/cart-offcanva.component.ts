import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchasePaymentConfirm } from 'src/app/models/Payment/PurchasePaymentConfirm';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { CartService } from 'src/app/services/cart/cart.service';
import { PurchasePaymentService } from 'src/app/services/purchase-payments/purchase-payment.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-cart-offcanva',
  templateUrl: './cart-offcanva.component.html',
  styleUrls: ['./cart-offcanva.component.css']
})
export class CartOffcanvaComponent implements OnInit {
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
  emptyCart(){
    this._cartService.emptyCart();
  }
  formatoArgentino(precio: number): string {
    return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  }

  removeArticle(cartArticleDetail: CartArticleDetail) {
    this._cartService.removeArticleFromCart(cartArticleDetail.article);
  }



  reservedPurchase(){
    console.log("Reservar la compra");
    var identity = this._storageService.getIdentity();
    let purchaseReserved = new PurchasePaymentConfirm();
    purchaseReserved.clientEmail = identity.email;
    purchaseReserved.clientId = identity.id;
    purchaseReserved.payInPerson = true;
    purchaseReserved.purchaseArticles = this.getPurchasesArticles();

    if(purchaseReserved.purchaseArticles.length > 0)
    {
      this._PurchasePaymentService.purchaseReserved(purchaseReserved, this._storageService.getTokenValue()).subscribe({
        next: (response) =>{
          if(response.error){
            AlertService.errorAlert('¡Error al intentar reservar la compra!');
          }else{
            AlertService.successAlert('¡Reservada!','Los articulos fueron reservados para su compra')
            .then((result) => {
              this.emptyCart();
              this._router.navigate(['/purchases/record']);
            });
          }
        },
        error: (err) => {
          AlertService.errorAlert('¡Error al intentar reservar la compra!');
          console.log(err)
        }
      })
    }
  }

  getPurchasesArticles(): PurchaseArticleCreation[]{
    var cartArticles: CartArticleDetail[] = this._cartService.getCartFromStorage();
    var purchasesArticles: PurchaseArticleCreation[] = [];
    for(var i=0; i<cartArticles.length; i++){
       purchasesArticles.push(cartArticles[i].purchaseArticle);
    }
    return purchasesArticles;
  }
}
