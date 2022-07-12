import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationStateREPARADOComponent } from './reparation-state-reparado.component';

describe('ReparationStateREPARADOComponent', () => {
  let component: ReparationStateREPARADOComponent;
  let fixture: ComponentFixture<ReparationStateREPARADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparationStateREPARADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationStateREPARADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
