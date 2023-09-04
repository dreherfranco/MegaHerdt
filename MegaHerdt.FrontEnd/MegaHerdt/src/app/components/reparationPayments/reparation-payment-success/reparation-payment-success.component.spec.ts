import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationPaymentSuccessComponent } from './reparation-payment-success.component';

describe('ReparationPaymentSuccessComponent', () => {
  let component: ReparationPaymentSuccessComponent;
  let fixture: ComponentFixture<ReparationPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationPaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
