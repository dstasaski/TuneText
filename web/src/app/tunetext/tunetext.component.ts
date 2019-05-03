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
    this.playSong();

    this.apiService.getTextMP3(input).subscribe(data => {
      this.playText(data.audioContent);
    });
  }

  playText(encodedAudio:string) {
    var audio = new Audio("data:audio/mp3;base64," + encodedAudio);
    audio.play();
  }

  playSong() {
    var audio = new Audio("http://localhost:5000/api/music/song");
    // audio.load();
    audio.volume = 0.25;
    audio.play();
  }
}
