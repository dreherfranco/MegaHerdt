import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateTransportCompanyComponent } from './dialog-update-transport-company.component';

describe('DialogUpdateTransportCompanyComponent', () => {
  let component: DialogUpdateTransportCompanyComponent;
  let fixture: ComponentFixture<DialogUpdateTransportCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateTransportCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateTransportCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
