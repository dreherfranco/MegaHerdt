import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReparationPaymentConfirm } from 'src/app/models/Payment/ReparationPaymentConfirm';
import { ReparationPaymentService } from 'src/app/services/reparation-payments/reparation-payment.service';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { Global } from 'src/app/utils/Global';
import { AlertService } from 'src/app/services/Alerts/AlertService';



@Component({
  selector: 'app-confirm-reparation-payment',
  templateUrl: './confirm-reparation-payment.component.html',
  styleUrls: ['./confirm-reparation-payment.component.css']
})
export class ConfirmReparationPaymentComponent implements OnInit {
  isLoading: boolean = true;
  reparationAmount: number;

  constructor(private fb: FormBuilder, 
     private _reparationPaymentService: ReparationPaymentService, 
     private _storageService: StorageService,
     private _route: ActivatedRoute, 
     private _reparationService: ReparationService) 
  {
    this.reparationAmount = 0;
  }

  ngOnInit(): void {
    this.getReparation();
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  getReparation(){
    var id = this.getReparationId();
    this._reparationService.getById(id,this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        console.log(result)
          this.reparationAmount = result.amount + result.totalArticleAmount;
          
          this.activarScript();

      },
      error: (err) => console.log(err)
    })
  }

  getReparationId(): number{
    let id: number = 0;
    this._route.params.subscribe(
      params => {
        id = params['id'];
      }
    );
    return id;
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
    window.apiConfirmPaymentUrl = `${Global.url}ReparationPayments/confirm-payment-mp`;

    // URL's DE REDIRECCION
    window.paymentSuccessRedirect = "http://localhost:4200/reparation-payment-success";
    window.paymentFailedRedirect = "http://localhost:4200/reparation-payment-failed";

    // SETEO EL MONTO DEL CARRITO
    window.reparationAmount = this.reparationAmount;
 
    window.reparationId = this.getReparationId();
    // Dejo la identidad de usuario logueado seteada globalmente.
    window.identity = this._storageService.getIdentity();

    script.textContent = `
    setTimeout(function() {
      console.log('DOMContentLoaded event fired');
      

      const mp = new MercadoPago('TEST-a14e30b8-57d4-45a9-9907-6e1f31a8cfe7', {
        locale: 'es-AR'
      });
  
      const bricksBuilder = mp.bricks();
      const renderCardPaymentBrick = async (bricksBuilder) => {
        const settings = {
          initialization: {
            // PROBAR SACAR EL MONTO DINAMICAMENTE DEL TOTAL DEL CARRITO
            amount: window.reparationAmount, // monto a ser pago
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
              maxInstallments: 1,
            }
          },
          callbacks: {
            onReady: () => {
              // callback llamado cuando Brick esté listo
            },
            onSubmit: (cardFormData) => {
              // SETEO EL ID DE LA REPARACION
              cardFormData.reparationId = window.reparationId;

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
/*
  createToken(): void {
    const name = this.stripeTest.controls['name'].value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          this.stripeToken = result.token.id;
          this.createPaymentMethod();
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
*/
    

/*
  confirmPayment(){
    var reparationId = this.getReparationId();
    var paymentConfirm = new ReparationPaymentConfirm(this.planSelected.count, reparationId, this.stripeToken) ;
    this._reparationPaymentService.confirmPayment(paymentConfirm, this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        console.log(result);
        /// REVISAR TAMBIEN EL BACKEND
       // if(result.subscription.status == "active"){
          this.subscriptionActive = true;
       // }
      }
    });
  }
*/
}
