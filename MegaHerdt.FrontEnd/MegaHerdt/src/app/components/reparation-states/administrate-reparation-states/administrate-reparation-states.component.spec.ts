import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateReparationStatesComponent } from './administrate-reparation-states.component';

describe('AdministrateReparationStatesComponent', () => {
  let component: AdministrateReparationStatesComponent;
  let fixture: ComponentFixture<AdministrateReparationStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateReparationStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateReparationStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
