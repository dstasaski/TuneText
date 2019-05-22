import { Injectable } from '@angular/core';
import { PlayService } from './play.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayresolverService implements Resolve<any>{
  text:string;

  constructor(private playService:PlayService) { }

  resolve() {
    return this.playService.savePlayer(this.text);
  }
}
