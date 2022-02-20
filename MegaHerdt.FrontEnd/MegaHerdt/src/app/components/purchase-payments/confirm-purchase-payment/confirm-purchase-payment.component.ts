import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeElementsService, StripeService } from 'ngx-stripe';
import { PaymentPlan } from 'src/app/models/Payment/PaymentPlan';
import { CartService } from 'src/app/services/cart/cart.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { availablePlans } from 'src/app/utils/AvailablePlans';
import { cardOptions } from 'src/app/utils/StripeCardElementsOptions';

@Component({
  selector: 'app-confirm-purchase-payment',
  templateUrl: './confirm-purchase-payment.component.html',
  styleUrls: ['./confirm-purchase-payment.component.css']
})
export class ConfirmPurchasePaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  availablePlans: Array<PaymentPlan> = new Array<PaymentPlan>();
  planSelected: PaymentPlan = new PaymentPlan(0, '', '');
  stripeToken: string = "";
  showCreateTokenForm: boolean = true;
  subscriptionActive: boolean = false;
  purchaseAmount: number = 0;
  cardOptions: StripeCardElementOptions = cardOptions;

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService,
    private _storageService: StorageService,
    private _route: ActivatedRoute, private _cartService: CartService) {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.card = new StripeCardComponent(new StripeElementsService(stripeService));
  }

  ngOnInit(): void {
    this.purchaseAmount = this._cartService.total.getValue();
    console.log(this.purchaseAmount)
  }

  createToken(): void {
    const name = this.stripeTest.controls['name'].value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          console.log(result.token.id);
          this.stripeToken = result.token.id;
          this.createPaymentMethod();
        } else if (result.error) {
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
          console.log("error")
        } else {
          this.handleInstallmentPlans();
        }
      }
    });
  }

  handleInstallmentPlans() {
    this.availablePlans = availablePlans;

    this.showCreateTokenForm = false;
  }

  selectPlan(plan: PaymentPlan) {
    this.planSelected = plan;
  }

  confirmPayment() {
   
  }
}
