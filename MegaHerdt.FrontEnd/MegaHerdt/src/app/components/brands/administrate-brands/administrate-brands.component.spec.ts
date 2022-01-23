import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateBrandsComponent } from './administrate-brands.component';

describe('AdministrateBrandsComponent', () => {
  let component: AdministrateBrandsComponent;
  let fixture: ComponentFixture<AdministrateBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
