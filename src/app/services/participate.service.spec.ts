import { TestBed } from '@angular/core/testing';

import { ParticipateService } from './participate.service';

describe('ParticipateService', () => {
  let service: ParticipateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
