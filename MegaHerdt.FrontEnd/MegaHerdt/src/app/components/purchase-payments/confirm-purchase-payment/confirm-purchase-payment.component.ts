import { Component, OnInit } from '@angular/core';
import { AddressUpdate } from 'src/app/models/Address/AddressUpdate';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchasePaymentConfirm } from 'src/app/models/Payment/PurchasePaymentConfirm';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { UserAddresses } from 'src/app/models/User/UserAddresses';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { AlertService } from 'src/app/services/Alerts/AlertService';
import { CartService } from 'src/app/services/cart/cart.service';
import { PurchasePaymentService } from 'src/app/services/purchase-payments/purchase-payment.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
import { Global } from 'src/app/utils/Global';

@Component({
  selector: 'app-confirm-purchase-payment',
  templateUrl: './confirm-purchase-payment.component.html',
  styleUrls: ['./confirm-purchase-payment.component.css']
})
export class ConfirmPurchasePaymentComponent implements OnInit {
  isLoading: boolean = true;
  purchaseAmount: number = 0;
  payInPerson: boolean = false;
  
  // DATOS DEL ENVIO
  userAddresses: UserAddresses = new UserAddresses(new Array<AddressUpdate>());
  addressSelected: AddressUpdate = new AddressUpdate(0,'',0,'',0,'','','');
  hasShipment: boolean = false;
  showShipmentForm: boolean = true;
  isAddressSelected: boolean = false;


  constructor(private _storageService: StorageService,
    private _cartService: CartService,
    private _userService: UserService,
    private _PurchasePaymentService: PurchasePaymentService) 
  {
   
  }

  ngOnInit(): void {
    this.purchaseAmount = this._cartService.total.getValue();
    this.activarScript();
    setTimeout(() =>{
      this.isLoading = false;
    },1500);

    this.getUserAddresses();
  }

  reservedPurchase(){
    console.log("Reservar la compra");
    var identity = this._storageService.getIdentity();
    let purchaseReserved = new PurchasePaymentConfirm();
    purchaseReserved.clientEmail = identity.email;
    purchaseReserved.clientId = identity.id;
    purchaseReserved.payInPerson = this.payInPerson;

    this._PurchasePaymentService.purchaseReserved(purchaseReserved, this._storageService.getTokenValue()).subscribe({
      next: (response) =>{
        if(response.error){
          AlertService.errorAlert('¡Error al intentar reservar la compra!');
        }else{
          AlertService.successAlert('¡Reservada!','Los articulos fueron reservados para su compra');
        }
      },
      error: (err) => {
        AlertService.errorAlert('¡Error al intentar reservar la compra!');
        console.log(err)
      }
    })
  }
 
  // EJECUTA EL SCRIPT DE MERCADO PAGO Y AL DARLE CLICK AL BOTON DE PAGAR 
  // VA AL BACKEND Y VUELVE CON UNA RESPUESTA
  activarScript() {
    
    const script = document.createElement('script');

    window.pagoStatus = (response: any)=>{
      if(response.status >=200 && response.status <= 300){
        AlertService.successAlert('¡La compra se realizó correctamente!')
        .then((result) => {
          if (result.isConfirmed) {
            // Una vez terminada la compra se limpia el carrito.
            this._cartService.emptyCart();
            
            window.location.href = window.paymentSuccessRedirect;
          }
        }); 
      }else{
        // ESTE MÉTODO TRANSFORMA LA RESPONSE EN JSON ASI RECIBO LOS MENSAJES
        // QUE ENVIO DESDE EL BACKEND
        response.json().then((data: any) => {
          console.error(data + "DATA"); 
          AlertService.errorAlert('¡Hubo un error en tu compra!', data.message)
            .then((result) => {
            if (result.isConfirmed) {
              window.location.href = window.paymentFailedRedirect
            }
          }); 
          
        });
      }
    }

    //URL DEL BACKEND
    window.apiConfirmPaymentUrl = `${Global.url}PurchasePayments/confirm-payment-mp`;

    // URL's DE REDIRECCION
    window.paymentSuccessRedirect = "http://localhost:4200/purchases/record";
    window.paymentFailedRedirect = "http://localhost:4200/confirm-purchase";

    // SETEO EL MONTO DEL CARRITO
    window.amount = this.purchaseAmount;
    // Dejo los articulos del carrito seteados globalmente.
    window.purchaseArticles = this.getPurchasesArticles();
    // Dejo la identidad de usuario logueado seteada globalmente.
    window.identity = this._storageService.getIdentity();
    window.payInPerson = this.payInPerson;

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
              cardFormData.payInPerson = window.payInPerson;
              cardFormData.shipmentAddressId = window.shipmentAddressId;

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

                    // EJECUTA EL DIALOGO CON EL MENSAJE DE SUCCESS O FAILED
                    window.pagoStatus(response)

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


  payInPersonSelect(payInPerson: boolean){
    this.payInPerson = payInPerson;
  }

 /************ DATOS DE ENVIO ***************/

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

    //window.hasShipment = this.hasShipment;
    window.shipmentAddressId = this.addressSelected.id;
  }

  confirmShipment(){
    this.showShipmentForm = false;
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

  comeBackInShipmentForm(){
    this.showShipmentForm = false;
  }
}
