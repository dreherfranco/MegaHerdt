import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseIncomeExpensesComponent } from './purchase-income-expenses.component';

describe('PurchaseIncomeExpensesComponent', () => {
  let component: PurchaseIncomeExpensesComponent;
  let fixture: ComponentFixture<PurchaseIncomeExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseIncomeExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseIncomeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
