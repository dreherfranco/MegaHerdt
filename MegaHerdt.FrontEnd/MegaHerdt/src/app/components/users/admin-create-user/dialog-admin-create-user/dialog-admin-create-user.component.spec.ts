import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdminCreateUserComponent } from './dialog-admin-create-user.component';

describe('DialogAdminCreateUserComponent', () => {
  let component: DialogAdminCreateUserComponent;
  let fixture: ComponentFixture<DialogAdminCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdminCreateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
