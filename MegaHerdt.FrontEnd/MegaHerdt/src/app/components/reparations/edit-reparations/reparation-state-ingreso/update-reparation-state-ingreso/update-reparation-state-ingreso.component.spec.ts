import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationStateINGRESOComponent } from './update-reparation-state-ingreso.component';

describe('UpdateReparationStateINGRESOComponent', () => {
  let component: UpdateReparationStateINGRESOComponent;
  let fixture: ComponentFixture<UpdateReparationStateINGRESOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationStateINGRESOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReparationStateINGRESOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
