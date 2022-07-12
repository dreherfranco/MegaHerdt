import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowPurchaseClaimAnswersComponent } from './dialog-show-purchase-claim-answers.component';

describe('DialogShowPurchaseClaimAnswersComponent', () => {
  let component: DialogShowPurchaseClaimAnswersComponent;
  let fixture: ComponentFixture<DialogShowPurchaseClaimAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowPurchaseClaimAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowPurchaseClaimAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
