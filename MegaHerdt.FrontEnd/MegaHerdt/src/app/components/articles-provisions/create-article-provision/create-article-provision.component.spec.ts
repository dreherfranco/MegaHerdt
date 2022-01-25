import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleProvisionComponent } from './create-article-provision.component';

describe('CreateArticleProvisionComponent', () => {
  let component: CreateArticleProvisionComponent;
  let fixture: ComponentFixture<CreateArticleProvisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArticleProvisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
