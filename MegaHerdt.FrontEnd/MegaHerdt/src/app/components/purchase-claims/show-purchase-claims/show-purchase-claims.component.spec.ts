import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPurchaseClaimsComponent } from './show-purchase-claims.component';

describe('ShowPurchaseClaimsComponent', () => {
  let component: ShowPurchaseClaimsComponent;
  let fixture: ComponentFixture<ShowPurchaseClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPurchaseClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPurchaseClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
