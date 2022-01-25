import { TestBed } from '@angular/core/testing';

import { ArticleProvisionService } from './article-provision.service';

describe('ArticleProvisionService', () => {
  let service: ArticleProvisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleProvisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
