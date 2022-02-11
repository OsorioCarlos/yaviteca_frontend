import { TestBed } from '@angular/core/testing';

import { ConservationStatusService } from './conservation-status.service';

describe('ConservationStatusService', () => {
  let service: ConservationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConservationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
