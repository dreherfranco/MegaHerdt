import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateCategoriesComponent } from './administrate-categories.component';

describe('AdministrateCategoriesComponent', () => {
  let component: AdministrateCategoriesComponent;
  let fixture: ComponentFixture<AdministrateCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
