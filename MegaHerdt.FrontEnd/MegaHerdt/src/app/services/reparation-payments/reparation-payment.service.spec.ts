import { TestBed } from '@angular/core/testing';

import { ReparationPaymentService } from './reparation-payment.service';

describe('ReparationPaymentService', () => {
  let service: ReparationPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReparationPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
