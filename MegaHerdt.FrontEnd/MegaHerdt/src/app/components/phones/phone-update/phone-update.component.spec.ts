import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneUpdateComponent } from './phone-update.component';

describe('PhoneUpdateComponent', () => {
  let component: PhoneUpdateComponent;
  let fixture: ComponentFixture<PhoneUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
