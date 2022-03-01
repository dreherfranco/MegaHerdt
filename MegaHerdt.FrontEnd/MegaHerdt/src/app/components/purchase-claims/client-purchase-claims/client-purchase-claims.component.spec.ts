import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPurchaseClaimsComponent } from './client-purchase-claims.component';

describe('ClientPurchaseClaimsComponent', () => {
  let component: ClientPurchaseClaimsComponent;
  let fixture: ComponentFixture<ClientPurchaseClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPurchaseClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPurchaseClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
