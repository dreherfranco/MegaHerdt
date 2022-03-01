import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowPurchaseDetailComponent } from './dialog-show-purchase-detail.component';

describe('DialogShowPurchaseDetailComponent', () => {
  let component: DialogShowPurchaseDetailComponent;
  let fixture: ComponentFixture<DialogShowPurchaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowPurchaseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowPurchaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
