import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPurchasesComponent } from './show-all-purchases.component';

describe('ShowAllPurchasesComponent', () => {
  let component: ShowAllPurchasesComponent;
  let fixture: ComponentFixture<ShowAllPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
