import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchasesInformationComponent } from './user-purchases-information.component';

describe('UserPurchasesInformationComponent', () => {
  let component: UserPurchasesInformationComponent;
  let fixture: ComponentFixture<UserPurchasesInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPurchasesInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPurchasesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
