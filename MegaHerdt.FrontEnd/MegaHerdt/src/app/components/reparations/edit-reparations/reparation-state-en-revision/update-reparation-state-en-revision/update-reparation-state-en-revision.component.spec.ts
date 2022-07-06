import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStateENREVISIONComponent } from './update-reparation-state-en-revision.component';

describe('UpdateReparationStateENREVISIONComponent', () => {
  let component: UpdateReparationStateENREVISIONComponent;
  let fixture: ComponentFixture<UpdateReparationStateENREVISIONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStateENREVISIONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStateENREVISIONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
