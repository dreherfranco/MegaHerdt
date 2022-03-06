import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransportCompanyComponent } from './create-transport-company.component';

describe('CreateTransportCompanyComponent', () => {
  let component: CreateTransportCompanyComponent;
  let fixture: ComponentFixture<CreateTransportCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransportCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransportCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
