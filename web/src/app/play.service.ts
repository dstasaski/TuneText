import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  sentiment = '';
  songID = '';
  text = '';
  textAudio:HTMLAudioElement;
  songAudio:HTMLAudioElement;

  constructor(private apiService: ApiService, private router: Router) { }

  savePlayer(text:string) {
    if (!text) {
      this.router.navigate(['']);
    } else {
      this.text = text;
      this.apiService.getTextSong(text).subscribe(textSong => {
        this.sentiment = textSong.sentiment;
        this.saveSong(textSong.songID);
      });

      this.apiService.getTextMP3(text).subscribe(base64mp3 => {
        this.saveTextAudio(base64mp3.audioContent);
      });
      
    }
  }

  saveSong(songID:string) {
    this.songID = songID;
    this.songAudio = new Audio(this.apiService.getSongUrl(songID));
    this.songAudio.volume = 0.40;
    this.songAudio.load();
  }

  saveTextAudio(encodedAudio:string) {
    this.textAudio = new Audio("data:audio/mp3;base64," + encodedAudio);
    this.textAudio.load();
  }

  playBoth() {
    this.songAudio.play();
    setTimeout( () => { this.textAudio.play(); }, 1000 );
  }

  pauseBoth() {
    if (this.songAudio) {
      this.songAudio.pause();
    }
    if (this.textAudio) {
      this.textAudio.pause();
    }
  }

  destroyPlayer() {
    this.pauseBoth();
    this.sentiment = '';
    this.songID = '';
    this.textAudio = null;
    this.songAudio = null;
  }
}
