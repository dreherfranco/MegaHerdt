import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesByBrandComponent } from './articles-by-brand.component';

describe('ArticlesByBrandComponent', () => {
  let component: ArticlesByBrandComponent;
  let fixture: ComponentFixture<ArticlesByBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesByBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
