import { Component, OnInit } from '@angular/core';
import { PlayService } from '../play.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  buttonText = 'Play';

  constructor(private playService:PlayService,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.snapshot.data.playResolver;
  }

  ngOnDestroy() {
    this.playService.destroyPlayer();
  }

  pressButton() {
    if (this.buttonText === 'Play') {
      this.playService.playBoth();
      this.buttonText = 'Pause';
    } else {
      this.playService.pauseBoth();
      this.buttonText = 'Play';
    }
  }
}
