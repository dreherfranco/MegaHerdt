import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticlesProvisionsComponent } from './edit-articles-provisions.component';

describe('EditArticlesProvisionsComponent', () => {
  let component: EditArticlesProvisionsComponent;
  let fixture: ComponentFixture<EditArticlesProvisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArticlesProvisionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticlesProvisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
