import { Component, OnInit } from '@angular/core';
import { PlayService } from '../play.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  sentiment:string;

  constructor(private playService:PlayService,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.snapshot.data.playResolver;
    this.sentiment = this.playService.sentiment;
  }
}
