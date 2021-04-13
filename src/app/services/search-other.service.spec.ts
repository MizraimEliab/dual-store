import { TestBed } from '@angular/core/testing';

import { SearchOtherService } from './search-other.service';

describe('SearchOtherService', () => {
  let service: SearchOtherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchOtherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
