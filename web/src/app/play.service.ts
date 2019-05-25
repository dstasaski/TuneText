import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  sentiment = '';
  songID = '';
  textAudio:HTMLAudioElement;
  songAudio:HTMLAudioElement;

  constructor(private apiService: ApiService) { }

  savePlayer(text:string) {
    this.apiService.getTextSong(text).subscribe(textSong => {
      this.sentiment = textSong.sentiment;
      this.saveSong(textSong.songID);
    });

    this.apiService.getTextMP3(text).subscribe(base64mp3 => {
      this.saveTextAudio(base64mp3.audioContent);
    });
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
    this.textAudio.play();
  }

  pauseBoth() {
    this.songAudio.pause();
    this.textAudio.pause();
  }
}
