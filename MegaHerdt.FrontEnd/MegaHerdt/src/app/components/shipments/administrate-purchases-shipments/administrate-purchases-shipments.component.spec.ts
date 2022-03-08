import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratePurchasesShipmentsComponent } from './administrate-purchases-shipments.component';

describe('AdministratePurchasesShipmentsComponent', () => {
  let component: AdministratePurchasesShipmentsComponent;
  let fixture: ComponentFixture<AdministratePurchasesShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratePurchasesShipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratePurchasesShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
