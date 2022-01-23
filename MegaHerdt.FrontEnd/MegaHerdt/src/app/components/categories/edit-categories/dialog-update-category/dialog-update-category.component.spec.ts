import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateCategoryComponent } from './dialog-update-category.component';

describe('DialogUpdateCategoryComponent', () => {
  let component: DialogUpdateCategoryComponent;
  let fixture: ComponentFixture<DialogUpdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
