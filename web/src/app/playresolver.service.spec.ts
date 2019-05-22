import { TestBed } from '@angular/core/testing';

import { PlayresolverService } from './playresolver.service';

describe('PlayresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayresolverService = TestBed.get(PlayresolverService);
    expect(service).toBeTruthy();
  });
});
