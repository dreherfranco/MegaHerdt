import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateENREPARACIONComponent } from './reparation-state-en-reparacion.component';

describe('ReparationStateENREPARACIONComponent', () => {
  let component: ReparationStateENREPARACIONComponent;
  let fixture: ComponentFixture<ReparationStateENREPARACIONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateENREPARACIONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateENREPARACIONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
