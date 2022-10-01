import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIncomeExpensesComponent } from './show-income-expenses.component';

describe('ShowIncomeExpensesComponent', () => {
  let component: ShowIncomeExpensesComponent;
  let fixture: ComponentFixture<ShowIncomeExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIncomeExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIncomeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
