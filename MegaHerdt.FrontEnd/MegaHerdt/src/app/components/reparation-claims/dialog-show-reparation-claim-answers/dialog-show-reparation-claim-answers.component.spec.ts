import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowReparationClaimAnswersComponent } from './dialog-show-reparation-claim-answers.component';

describe('DialogShowReparationClaimAnswersComponent', () => {
  let component: DialogShowReparationClaimAnswersComponent;
  let fixture: ComponentFixture<DialogShowReparationClaimAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowReparationClaimAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowReparationClaimAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
