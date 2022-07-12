import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStateENREPARACIONComponent } from './update-reparation-state-en-reparacion.component';

describe('UpdateReparationStateENREPARACIONComponent', () => {
  let component: UpdateReparationStateENREPARACIONComponent;
  let fixture: ComponentFixture<UpdateReparationStateENREPARACIONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStateENREPARACIONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStateENREPARACIONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
