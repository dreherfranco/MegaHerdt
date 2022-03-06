import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateTransportCompaniesComponent } from './administrate-transport-companies.component';

describe('AdministrateTransportCompaniesComponent', () => {
  let component: AdministrateTransportCompaniesComponent;
  let fixture: ComponentFixture<AdministrateTransportCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateTransportCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateTransportCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
