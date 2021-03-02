import { TestBed } from '@angular/core/testing';

import { IntentPredictService } from './intent-predict.service';

describe('IntentPredictService', () => {
  let service: IntentPredictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntentPredictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
