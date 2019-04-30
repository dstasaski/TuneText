import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tunetext',
  templateUrl: './tunetext.component.html',
  styleUrls: ['./tunetext.component.css'],
  providers: [ApiService]
})
export class TunetextComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(input:string) {
    this.apiService.getTextMP3(input).subscribe(data => {
      this.playAudio(data.audioContent);
    });
  }

  playAudio(encodedAudio:string) {
    var audio = new Audio("data:audio/mp3;base64," + encodedAudio);
    audio.play();
  }
}
