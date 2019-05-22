import { Component, OnInit } from '@angular/core';
import { PlayService } from '../play.service';
import { Router } from '@angular/router';
import { PlayresolverService } from '../playresolver.service';

@Component({
  selector: 'app-tunetext',
  templateUrl: './tunetext.component.html',
  styleUrls: ['./tunetext.component.css'],
  providers: [PlayService]
})
export class TunetextComponent implements OnInit {
  constructor(private playService: PlayService,
    private playResolver: PlayresolverService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(input:string) {
    this.playResolver.text = input;
    this.router.navigate(['player'])
  }
}
