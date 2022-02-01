import { TestBed } from '@angular/core/testing';

import { ReparationClaimService } from './reparation-claim.service';

describe('ReparationClaimService', () => {
  let service: ReparationClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReparationClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
