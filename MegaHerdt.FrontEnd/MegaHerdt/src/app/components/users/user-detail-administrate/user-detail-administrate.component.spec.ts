import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailAdministrateComponent } from './user-detail-administrate.component';

describe('UserDetailAdministrateComponent', () => {
  let component: UserDetailAdministrateComponent;
  let fixture: ComponentFixture<UserDetailAdministrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailAdministrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailAdministrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
