import { TestBed } from '@angular/core/testing';

import { AzureVisionService } from './azure-vision.service';

describe('AzureVisionService', () => {
  let service: AzureVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
