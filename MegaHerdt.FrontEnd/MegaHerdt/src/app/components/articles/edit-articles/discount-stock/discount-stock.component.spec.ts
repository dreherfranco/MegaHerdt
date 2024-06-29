import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountStockComponent } from './discount-stock.component';

describe('DiscountStockComponent', () => {
  let component: DiscountStockComponent;
  let fixture: ComponentFixture<DiscountStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
