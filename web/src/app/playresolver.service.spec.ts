import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PlayresolverService } from './playresolver.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('PlayresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: PlayresolverService = TestBed.get(PlayresolverService);
    expect(service).toBeTruthy();
  });
});
