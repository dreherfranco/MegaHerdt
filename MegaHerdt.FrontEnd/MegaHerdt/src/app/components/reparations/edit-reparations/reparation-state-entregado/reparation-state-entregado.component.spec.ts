import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateENTREGADOComponent } from './reparation-state-entregado.component';

describe('ReparationStateENTREGADOComponent', () => {
  let component: ReparationStateENTREGADOComponent;
  let fixture: ComponentFixture<ReparationStateENTREGADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateENTREGADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateENTREGADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
