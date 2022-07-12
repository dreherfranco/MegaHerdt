import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStateENTREGADOComponent } from './update-reparation-state-entregado.component';

describe('UpdateReparationStateENTREGADOComponent', () => {
  let component: UpdateReparationStateENTREGADOComponent;
  let fixture: ComponentFixture<UpdateReparationStateENTREGADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStateENTREGADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStateENTREGADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
