import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateReparationStateComponent } from './dialog-update-reparation-state.component';

describe('DialogUpdateReparationStateComponent', () => {
  let component: DialogUpdateReparationStateComponent;
  let fixture: ComponentFixture<DialogUpdateReparationStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateReparationStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateReparationStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
