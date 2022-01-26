import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReparationStatesComponent } from './edit-reparation-states.component';

describe('EditReparationStatesComponent', () => {
  let component: EditReparationStatesComponent;
  let fixture: ComponentFixture<EditReparationStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReparationStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReparationStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
