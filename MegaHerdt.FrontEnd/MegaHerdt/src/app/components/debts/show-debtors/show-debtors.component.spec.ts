import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDebtorsComponent } from './show-debtors.component';

describe('ShowDebtorsComponent', () => {
  let component: ShowDebtorsComponent;
  let fixture: ComponentFixture<ShowDebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDebtorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
