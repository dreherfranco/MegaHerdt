import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateArticlesProvisionsComponent } from './administrate-articles-provisions.component';

describe('AdministrateArticlesProvisionsComponent', () => {
  let component: AdministrateArticlesProvisionsComponent;
  let fixture: ComponentFixture<AdministrateArticlesProvisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrateArticlesProvisionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrateArticlesProvisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
