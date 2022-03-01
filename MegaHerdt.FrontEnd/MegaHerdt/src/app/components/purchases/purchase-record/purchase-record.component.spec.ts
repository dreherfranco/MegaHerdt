import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRecordComponent } from './purchase-record.component';

describe('PurchaseRecordComponent', () => {
  let component: PurchaseRecordComponent;
  let fixture: ComponentFixture<PurchaseRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
