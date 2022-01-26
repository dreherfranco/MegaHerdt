import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReparationStatesComponent } from './create-reparation-states.component';

describe('CreateReparationStatesComponent', () => {
  let component: CreateReparationStatesComponent;
  let fixture: ComponentFixture<CreateReparationStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReparationStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReparationStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
