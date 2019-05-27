import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PlayService } from './play.service';

describe('PlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: PlayService = TestBed.get(PlayService);
    expect(service).toBeTruthy();
  });
});
