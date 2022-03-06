import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransportCompaniesComponent } from './edit-transport-companies.component';

describe('EditTransportCompaniesComponent', () => {
  let component: EditTransportCompaniesComponent;
  let fixture: ComponentFixture<EditTransportCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTransportCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransportCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
