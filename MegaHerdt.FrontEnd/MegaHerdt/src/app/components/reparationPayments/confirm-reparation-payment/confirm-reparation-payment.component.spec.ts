import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReparationPaymentComponent } from './confirm-reparation-payment.component';

describe('ConfirmReparationPaymentComponent', () => {
  let component: ConfirmReparationPaymentComponent;
  let fixture: ComponentFixture<ConfirmReparationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmReparationPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReparationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
