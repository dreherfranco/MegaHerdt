import { TestBed } from '@angular/core/testing';

import { PurchaseClaimService } from './purchase-claim.service';

describe('PurchaseClaimService', () => {
  let service: PurchaseClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
