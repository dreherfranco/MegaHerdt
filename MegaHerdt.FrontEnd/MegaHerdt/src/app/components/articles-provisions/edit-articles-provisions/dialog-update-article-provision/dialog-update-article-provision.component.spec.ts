import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateArticleProvisionComponent } from './dialog-update-article-provision.component';

describe('DialogUpdateArticleProvisionComponent', () => {
  let component: DialogUpdateArticleProvisionComponent;
  let fixture: ComponentFixture<DialogUpdateArticleProvisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateArticleProvisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateArticleProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
