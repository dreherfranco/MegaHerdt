import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateOffersComponent } from './administrate-offers.component';

describe('AdministrateOffersComponent', () => {
  let component: AdministrateOffersComponent;
  let fixture: ComponentFixture<AdministrateOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
