import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeElementsService, StripeService } from 'ngx-stripe';
import { ReparationPaymentConfirm } from 'src/app/models/Payment/ReparationPaymentConfirm';
import { PaymentPlan } from 'src/app/models/Payment/PaymentPlan';
import { ReparationPaymentService } from 'src/app/services/reparation-payments/reparation-payment.service';
import { ReparationService } from 'src/app/services/reparations/reparation.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { availablePlans } from 'src/app/utils/AvailablePlans';
import { cardOptions } from 'src/app/utils/StripeCardElementsOptions';

@Component({
  selector: 'app-confirm-reparation-payment',
  templateUrl: './confirm-reparation-payment.component.html',
  styleUrls: ['./confirm-reparation-payment.component.css']
})
export class ConfirmReparationPaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  availablePlans: Array<PaymentPlan>;
 // paymentIntentId: string;
  planSelected: PaymentPlan;
  stripeToken: string;
  reparationAmount: number;
  showCreateTokenForm: boolean;
  subscriptionActive: boolean;
  cardOptions: StripeCardElementOptions = cardOptions;

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService,
     private _reparationPaymentService: ReparationPaymentService, private _storageService: StorageService,
     private _route: ActivatedRoute, private _reparationService: ReparationService) {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.card = new StripeCardComponent(new StripeElementsService(stripeService))
    this.availablePlans = new Array<PaymentPlan>();
  //  this.paymentIntentId = '';
    this.planSelected = new PaymentPlan(0,'','');
    this.stripeToken = "";
    this.reparationAmount = 0;
    this.showCreateTokenForm = true;
    this.subscriptionActive = false;
  }

  ngOnInit(): void {
    this.getReparation();
  }

  getReparation(){
    var id = this.getReparationId();
    this._reparationService.getById(id,this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        console.log(result)
          this.reparationAmount = result.amount + result.totalArticleAmount;
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

    
  }

  createPaymentMethod() {
    this.stripeService.createPaymentMethod({
      type: 'card',
      card: this.card.element,
      billing_details: { name: this.stripeTest.controls['name'].value }
    }).subscribe({
      next: (result) => {
        if (result.error) {
          // Show error in payment form
          console.log("error")
        } else {
          var params = JSON.stringify(result.paymentMethod?.id);
          // Otherwise send paymentMethod.id to your server (see Step 2)
          //var details = this.http.post('https://localhost:7036/api/Payments/collectDetails', params, { headers: this.headers })
          this.handleInstallmentPlans(/*details*/);
        }
      }
    });

  }

  handleInstallmentPlans(/*response: Observable<any>*/) {
  //  response.subscribe({
    //  next: result => {
     //   console.log(result)
        //var availablePlans = result.available_plans;
      //  this.paymentIntentId = result.intent_id;
        //TEST DATA
        this.availablePlans = availablePlans;

          this.showCreateTokenForm = false;
      //}
 //   });
  }

  selectPlan(plan: PaymentPlan){
    this.planSelected = plan;
  }

  confirmPayment(){
    var reparationId = this.getReparationId();
    var paymentConfirm = new ReparationPaymentConfirm(this.planSelected.count, reparationId, this.stripeToken) ;
    this._reparationPaymentService.confirmPayment(paymentConfirm, this._storageService.getTokenValue()).subscribe({
      next: (result) =>{
        console.log(result);
        if(result.subscription.status == "active"){
          this.subscriptionActive = true;
        }
      }
    });
  }

}
