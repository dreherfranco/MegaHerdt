import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCreationComponent } from './address-creation.component';

describe('AddressCreationComponent', () => {
  let component: AddressCreationComponent;
  let fixture: ComponentFixture<AddressCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
