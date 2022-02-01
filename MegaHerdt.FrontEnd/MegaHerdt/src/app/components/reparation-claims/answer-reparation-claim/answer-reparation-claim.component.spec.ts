import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerReparationClaimComponent } from './answer-reparation-claim.component';

describe('AnswerReparationClaimComponent', () => {
  let component: AnswerReparationClaimComponent;
  let fixture: ComponentFixture<AnswerReparationClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerReparationClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerReparationClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
