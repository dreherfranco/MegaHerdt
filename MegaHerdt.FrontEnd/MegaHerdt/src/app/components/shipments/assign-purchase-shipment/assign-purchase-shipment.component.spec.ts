import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPurchaseShipmentComponent } from './assign-purchase-shipment.component';

describe('AssignPurchaseShipmentComponent', () => {
  let component: AssignPurchaseShipmentComponent;
  let fixture: ComponentFixture<AssignPurchaseShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPurchaseShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPurchaseShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
