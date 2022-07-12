import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStateREPARADOComponent } from './update-reparation-state-reparado.component';

describe('UpdateReparationStateREPARADOComponent', () => {
  let component: UpdateReparationStateREPARADOComponent;
  let fixture: ComponentFixture<UpdateReparationStateREPARADOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStateREPARADOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStateREPARADOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
