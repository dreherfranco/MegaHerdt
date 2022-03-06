import { TestBed } from '@angular/core/testing';

import { TransportCompanyService } from './transport-company.service';

describe('TransportCompanyService', () => {
  let service: TransportCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
