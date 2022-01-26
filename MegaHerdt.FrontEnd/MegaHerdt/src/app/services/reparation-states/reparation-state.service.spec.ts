import { TestBed } from '@angular/core/testing';

import { ReparationStateService } from './reparation-state.service';

describe('ReparationStateService', () => {
  let service: ReparationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReparationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
