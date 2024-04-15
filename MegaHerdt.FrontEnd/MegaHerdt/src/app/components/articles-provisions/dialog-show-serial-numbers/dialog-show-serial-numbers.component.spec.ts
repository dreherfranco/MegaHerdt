import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowSerialNumbersComponent } from './dialog-show-serial-numbers.component';

describe('DialogShowSerialNumbersComponent', () => {
  let component: DialogShowSerialNumbersComponent;
  let fixture: ComponentFixture<DialogShowSerialNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowSerialNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowSerialNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
