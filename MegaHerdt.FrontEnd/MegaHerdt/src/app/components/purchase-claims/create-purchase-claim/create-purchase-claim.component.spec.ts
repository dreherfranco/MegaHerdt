import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseClaimComponent } from './create-purchase-claim.component';

describe('CreatePurchaseClaimComponent', () => {
  let component: CreatePurchaseClaimComponent;
  let fixture: ComponentFixture<CreatePurchaseClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePurchaseClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
