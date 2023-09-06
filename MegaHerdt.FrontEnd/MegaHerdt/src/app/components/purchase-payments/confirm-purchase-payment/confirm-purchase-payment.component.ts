import { Component, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeElementsService, StripeService } from 'ngx-stripe';
import { AddressUpdate } from 'src/app/models/Address/AddressUpdate';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PaymentPlan } from 'src/app/models/Payment/PaymentPlan';
import { PurchasePaymentConfirm } from 'src/app/models/Payment/PurchasePaymentConfirm';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { UserAddresses } from 'src/app/models/User/UserAddresses';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { CartService } from 'src/app/services/cart/cart.service';
import { PurchasePaymentService } from 'src/app/services/purchase-payments/purchase-payment.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { availablePlans } from 'src/app/utils/AvailablePlans';
import { Global } from 'src/app/utils/Global';
import { cardOptions } from 'src/app/utils/StripeCardElementsOptions';

/**
 * Defino la interfaz para definir el monto del carrito
 */
declare global {
  interface Window {
    apiConfirmPaymentUrl: string;

    paymentSuccessRedirect: string;
    paymentFailedRedirect: string;
    // Monto total del carrito.
    amount: number;

    // Articulos en el carrito.
    purchaseArticles: Array<PurchaseArticleCreation>;

    // Identidad del usuario logueado.
    identity: UserDetail;

  }
}

@Component({
  selector: 'app-confirm-purchase-payment',
  templateUrl: './confirm-purchase-payment.component.html',
  styleUrls: ['./confirm-purchase-payment.component.css']
})
export class ConfirmPurchasePaymentComponent implements OnInit {
  isLoading: boolean = true;
  purchaseAmount: number = 0;

  /*
  userAddresses: UserAddresses = new UserAddresses(new Array<AddressUpdate>());
  addressSelected: AddressUpdate = new AddressUpdate(0,'',0,'',0,'','','');
  hasShipment: boolean = false;
  isAddressSelected: boolean = false;
  */

  constructor(
    private _storageService: StorageService,
    private _purchasePaymentService: PurchasePaymentService, 
    private _cartService: CartService, 
    private _userService: UserService) {
   
  }

  ngOnInit(): void {
    this.purchaseAmount = this._cartService.total.getValue();
    this.activarScript();
    setTimeout(() =>{
      this.isLoading = false;
    },1500);
  }

 
  // EJECUTA EL SCRIPT DE MERCADO PAGO Y AL DARLE CLICK AL BOTON DE PAGAR 
  // VA AL BACKEND Y VUELVE CON UNA RESPUESTA
  activarScript() {
    
    const script = document.createElement('script');

    //URL DEL BACKEND
    window.apiConfirmPaymentUrl = `${Global.url}PurchasePayments/confirm-payment-mp`;

    // URL's DE REDIRECCION
    window.paymentSuccessRedirect = "http://localhost:4200/purchase-success";
    window.paymentFailedRedirect = "http://localhost:4200/purchase-failed";

    // SETEO EL MONTO DEL CARRITO
    window.amount = this.purchaseAmount;
    // Dejo los articulos del carrito seteados globalmente.
    window.purchaseArticles = this.getPurchasesArticles();
    // Dejo la identidad de usuario logueado seteada globalmente.
    window.identity = this._storageService.getIdentity();

    script.textContent = `
    setTimeout(function() {
      console.log('DOMContentLoaded event fired');
      
      // MUESTRO EL MONTO DEL CARRITO
      console.log(window.amount);
      console.log(window.purchaseArticles);

      
      const mp = new MercadoPago('TEST-a14e30b8-57d4-45a9-9907-6e1f31a8cfe7', {
        locale: 'es-AR'
      });
  
      const bricksBuilder = mp.bricks();
      const renderCardPaymentBrick = async (bricksBuilder) => {
        const settings = {
          initialization: {
            // PROBAR SACAR EL MONTO DINAMICAMENTE DEL TOTAL DEL CARRITO
            amount: window.amount, // monto a ser pago
            payer: {
              // EMAIL PARA HACER LAS PRUEBAS EN MERCADO PAGO
              // AGREGAR OTROS EMAILS PARA HACER MAS PRUEBAS
              email: "",
            },
          },
          customization: {
            visual: {
              style: {
                theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
              }
            },
            paymentMethods: {
              maxInstallments: 12,
            }
          },
          callbacks: {
            onReady: () => {
              // callback llamado cuando Brick esté listo
            },
            onSubmit: (cardFormData) => {
              // ENVIO LOS DATOS DE LOS ARTICULOS QUE SE VAN A COMPRAR
              cardFormData.purchaseArticles = window.purchaseArticles;
              cardFormData.clientEmail = window.identity.email;
              cardFormData.clientId = window.identity.id;

              //  callback llamado cuando el usuario haga clic en el botón enviar los datos
              //  ejemplo de envío de los datos recolectados por el Brick a su servidor
              return new Promise((resolve, reject) => {

                // LE PASO COMO PARAMETRO LA URL DEL BACKEND A LA CUAL DEBE IR A EFECTUAR EL PAGO.
                fetch(window.apiConfirmPaymentUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(cardFormData)
                })
                  .then((response) => {
                    console.log(response);
                    
                    //Si la response es existosa
                    if(response.status >= 200 && response.status <= 300){
                      //REDIRIGE AL COMPONENTE purchase-success.component
                      window.location.href = window.paymentSuccessRedirect;
                    }
                    // En caso de error
                    else
                    {
                      //REDIRIGE AL COMPONENTE purchase-failed.component
                      window.location.href = window.paymentFailedRedirect;
                    }

                    // recibir el resultado del pago
                    resolve();
                  })
                  .catch((error) => {
                    console.log(error);
                    // tratar respuesta de error al intentar crear el pago
                    reject();
                  })
              });
            },
            onError: (error) => {
              // callback llamado para todos los casos de error de Brick
              console.log(error);
            },
          },
        };
        window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
      };
      renderCardPaymentBrick(bricksBuilder);
    }, 1000);
    `;

    document.head.appendChild(script);
  }

  getPurchasesArticles(): PurchaseArticleCreation[]{
    var cartArticles: CartArticleDetail[] = this._cartService.getCartFromStorage();
    var purchasesArticles: PurchaseArticleCreation[] = [];
    for(var i=0; i<cartArticles.length; i++){
       purchasesArticles.push(cartArticles[i].purchaseArticle);
    }
    return purchasesArticles;
  }

/*

  selectIfHasShipment(hasShipment: boolean){
    this.hasShipment = hasShipment;
    this.isAddressSelected = false;
  }

  getUserAddresses(){
    var identity: UserDetail = this._storageService.getIdentity();
    this._userService.getByEmail(identity.email).subscribe({
      next: (result) =>{
        this.userAddresses.addresses = result.addresses;
      }
    });
  }

  selectAddress(address: AddressUpdate) {
    this.addressSelected = address;
    this.isAddressSelected = true;
  }

  confirmShipment(){
    this.showShipmentForm = false;
    this.showPlanSelectForm = true;
  }

  shipmentFormOk(): boolean{
    if(this.hasShipment && this.isAddressSelected){
      return true;
    }else if(!this.hasShipment){
      return true;
    }else{
      return false;
    }
  }
  test(): any{
    console.log("prueba desde componente .ts");
  }
  comeBackInShipmentForm(){
    this.showShipmentForm = false;
    this.showCreateTokenForm = true;
  }

  createPaymentMethod() {
    this.stripeService.createPaymentMethod({
      type: 'card',
      card: this.card.element,
      billing_details: { name: this.stripeTest.controls['name'].value }
    }).subscribe({
      next: (result) => {
        if (result.error) {
          console.log(result.error)
        } else {
          this.handleInstallmentPlans();
        }
      }
    });
  }

  handleInstallmentPlans() {
    this.availablePlans = availablePlans;
  }

  comeBackInPlanSelectForm(){
    this.showPlanSelectForm = false;
    this.showShipmentForm = true;
    this.planSelected = new PaymentPlan(0, '', '');
    this.hasShipment = false;
  }

  confirmPayment() {
    var identity: UserDetail = this._storageService.getIdentity();
    var purchasesArticles = this.getPurchasesArticles();
    var purchasePaymentConfirm = new PurchasePaymentConfirm(this.planSelected.count, identity.email,
    identity.id, this.stripeToken, this.hasShipment, this.addressSelected.id, purchasesArticles);
    
    this._purchasePaymentService.confirmPayment(purchasePaymentConfirm, this._storageService.getTokenValue()).subscribe({
      next: (result) => {
        if(result.subscription.status == "active"){
          this.subscriptionActive = true;
          this.showPlanSelectForm = false;
          this._cartService.emptyCart();
        }
      }
    });
  }

  getPurchasesArticles(): PurchaseArticleCreation[]{
    var cartArticles: CartArticleDetail[] = this._cartService.getCartFromStorage();
    var purchasesArticles: PurchaseArticleCreation[] = [];
    for(var i=0; i<cartArticles.length; i++){
       purchasesArticles.push(cartArticles[i].purchaseArticle);
    }
    return purchasesArticles;
  }

  confirmPaymentFormOk(): boolean{
      return this.planSelected.count != 0;
  }*/
}
