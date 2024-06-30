import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionStockDiscountedGridComponent } from './provision-stock-discounted-grid.component';

describe('ProvisionStockDiscountedGridComponent', () => {
  let component: ProvisionStockDiscountedGridComponent;
  let fixture: ComponentFixture<ProvisionStockDiscountedGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionStockDiscountedGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionStockDiscountedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
