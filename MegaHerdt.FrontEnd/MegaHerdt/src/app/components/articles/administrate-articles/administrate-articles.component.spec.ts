import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateArticlesComponent } from './administrate-articles.component';

describe('AdministrateArticlesComponent', () => {
  let component: AdministrateArticlesComponent;
  let fixture: ComponentFixture<AdministrateArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
