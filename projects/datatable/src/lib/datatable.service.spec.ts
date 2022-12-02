import { TestBed } from '@angular/core/testing';

import { DatatableService } from './datatable.service';

describe('DatatableService', () => {
  let service: DatatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
