import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeElementsService, StripeService } from 'ngx-stripe';
import { AddressUpdate } from 'src/app/models/Address/AddressUpdate';
import { PaymentPlan } from 'src/app/models/Payment/PaymentPlan';
import { UserAddresses } from 'src/app/models/User/UserAddresses';
import { UserDetail } from 'src/app/models/User/UserDetail';
import { CartService } from 'src/app/services/cart/cart.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/users/user.service';
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
  isTokenValid: boolean = false;
  purchaseAmount: number = 0;
  cardOptions: StripeCardElementOptions = cardOptions;
  userAddresses: UserAddresses = new UserAddresses(new Array<AddressUpdate>());
  addressSelected: AddressUpdate = new AddressUpdate(0,'',0,'',0,'','','');
  hasShipment: boolean = false;
  isShipmentConfirm: boolean = false;
  isAddressSelected: boolean = false;

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService,
    private _storageService: StorageService,
    private _route: ActivatedRoute, private _cartService: CartService, private _userService: UserService) {
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
          this.isTokenValid = true;
          this.createPaymentMethod();
          this.getUserAddresses();
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

  selectPlan(plan: PaymentPlan) {
    this.planSelected = plan;
  }

  confirmPayment() {
   
  }

  selectIfHasShipment(hasShipment: boolean){
    this.hasShipment = hasShipment;
  }

  getUserAddresses(){
    var identity: UserDetail = this._storageService.getIdentity();
    this._userService.getByEmail(identity.email).subscribe({
      next: (result) =>{
        this.userAddresses.addresses = result.addresses;
        this.showCreateTokenForm = false;
      }
    });
  }

  selectAddress(address: AddressUpdate) {
    this.addressSelected = address;
    this.isAddressSelected = true;
  }

  confirmShipment(){
    if(this.hasShipment && this.isAddressSelected){
      this.isShipmentConfirm = true;
    }else if(!this.hasShipment){
      this.isShipmentConfirm = true;
    }else{
      this.isShipmentConfirm = false;
    }
  }

  comeBackInShipmentForm(){
    this.isTokenValid = false;
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
          console.log("error")
        } else {
          this.handleInstallmentPlans();
        }
      }
    });
  }

  handleInstallmentPlans() {
    this.availablePlans = availablePlans;
  }

}
