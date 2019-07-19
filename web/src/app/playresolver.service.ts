import { Injectable } from '@angular/core';
import { PlayService } from './play.service';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PlayresolverService implements Resolve<any>{
  text:string;

  constructor(private playService:PlayService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.queryParams['id']
    if (id) {
      return this.playService.getPlayer(id)
    } else {
      return this.playService.savePlayer(this.text);
    }
  }
}
