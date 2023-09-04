import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationPaymentFailedComponent } from './reparation-payment-failed.component';

describe('ReparationPaymentFailedComponent', () => {
  let component: ReparationPaymentFailedComponent;
  let fixture: ComponentFixture<ReparationPaymentFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationPaymentFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationPaymentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
