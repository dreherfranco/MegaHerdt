import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesProvisionsGridComponent } from './articles-provisions-grid.component';

describe('ArticlesProvisionsGridComponent', () => {
  let component: ArticlesProvisionsGridComponent;
  let fixture: ComponentFixture<ArticlesProvisionsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesProvisionsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesProvisionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
