import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerPurchaseClaimsComponent } from './answer-purchase-claims.component';

describe('AnswerPurchaseClaimsComponent', () => {
  let component: AnswerPurchaseClaimsComponent;
  let fixture: ComponentFixture<AnswerPurchaseClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerPurchaseClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerPurchaseClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
