import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PlayService } from './play.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, RouterModule } from '@angular/router';

describe('PlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      RouterTestingModule,
      RouterModule.forRoot([])
    ]
  }));

  it('should be created', () => {
    const service: PlayService = TestBed.get(PlayService);
    expect(service).toBeTruthy();
  });
});
