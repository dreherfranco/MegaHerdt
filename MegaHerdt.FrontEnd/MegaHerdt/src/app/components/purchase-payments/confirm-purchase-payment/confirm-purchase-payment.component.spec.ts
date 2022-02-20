import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPurchasePaymentComponent } from './confirm-purchase-payment.component';

describe('ConfirmPurchasePaymentComponent', () => {
  let component: ConfirmPurchasePaymentComponent;
  let fixture: ComponentFixture<ConfirmPurchasePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPurchasePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPurchasePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
