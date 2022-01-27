import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateReparationsComponent } from './administrate-reparations.component';

describe('AdministrateReparationsComponent', () => {
  let component: AdministrateReparationsComponent;
  let fixture: ComponentFixture<AdministrateReparationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateReparationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateReparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
