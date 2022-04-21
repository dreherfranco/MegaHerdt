import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdatePriceArticleByCategoryComponent } from './dialog-update-price-article-by-category.component';

describe('DialogUpdatePriceArticleByCategoryComponent', () => {
  let component: DialogUpdatePriceArticleByCategoryComponent;
  let fixture: ComponentFixture<DialogUpdatePriceArticleByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdatePriceArticleByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdatePriceArticleByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
