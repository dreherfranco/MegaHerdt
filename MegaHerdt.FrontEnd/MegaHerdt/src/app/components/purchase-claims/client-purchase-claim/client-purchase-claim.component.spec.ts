import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPurchaseClaimComponent } from './client-purchase-claim.component';

describe('ClientPurchaseClaimComponent', () => {
  let component: ClientPurchaseClaimComponent;
  let fixture: ComponentFixture<ClientPurchaseClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPurchaseClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPurchaseClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
