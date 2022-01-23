import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateProvidersComponent } from './administrate-providers.component';

describe('AdministrateProvidersComponent', () => {
  let component: AdministrateProvidersComponent;
  let fixture: ComponentFixture<AdministrateProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
