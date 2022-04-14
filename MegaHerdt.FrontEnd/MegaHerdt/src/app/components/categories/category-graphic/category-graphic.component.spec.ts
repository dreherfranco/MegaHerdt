import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGraphicComponent } from './category-graphic.component';

describe('CategoryGraphicComponent', () => {
  let component: CategoryGraphicComponent;
  let fixture: ComponentFixture<CategoryGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
