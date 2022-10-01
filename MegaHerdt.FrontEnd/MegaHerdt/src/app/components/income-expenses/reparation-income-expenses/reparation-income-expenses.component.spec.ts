import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationIncomeExpensesComponent } from './reparation-income-expenses.component';

describe('ReparationIncomeExpensesComponent', () => {
  let component: ReparationIncomeExpensesComponent;
  let fixture: ComponentFixture<ReparationIncomeExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationIncomeExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationIncomeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
