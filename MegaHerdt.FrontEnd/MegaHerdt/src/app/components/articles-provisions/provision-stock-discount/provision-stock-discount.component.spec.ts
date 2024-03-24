import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionStockDiscountComponent } from './provision-stock-discount.component';

describe('ProvisionStockDiscountComponent', () => {
  let component: ProvisionStockDiscountComponent;
  let fixture: ComponentFixture<ProvisionStockDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionStockDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionStockDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
