import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { HometextComponent } from './hometext/hometext.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutComponent } from './about/about.component';
import { DonateComponent } from './donate/donate.component';
import { PlayresolverService } from './playresolver.service';

const routes: Routes = [
  { path: '', component: HometextComponent},
  { path: 'player', component: PlayerComponent, resolve: {playResolver : PlayresolverService}},
  { path: 'about', component: AboutComponent},
  { path: 'donate', component: DonateComponent},
  { path: '**', component:  PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    PlayresolverService
  ]
})
export class AppRoutingModule { }
