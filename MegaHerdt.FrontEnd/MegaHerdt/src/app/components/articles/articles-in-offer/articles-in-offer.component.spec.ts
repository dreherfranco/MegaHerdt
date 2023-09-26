import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesInOfferComponent } from './articles-in-offer.component';

describe('ArticlesInOfferComponent', () => {
  let component: ArticlesInOfferComponent;
  let fixture: ComponentFixture<ArticlesInOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesInOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesInOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
