import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { StoredPlayer } from 'src/models/storedplayer';
import { Base64MP3 } from 'src/models/mp3';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  sentiment = '';
  songID = '';
  text = '';
  textAudio:HTMLAudioElement;
  songAudio:HTMLAudioElement;

  stored = false
  storedDatetime = '';
  error = false
  playerInvoked = false

  constructor(private apiService: ApiService, private router: Router) { }

  async getPlayer(id:string) {
    this.playerInvoked = true
    const storedPlayer: StoredPlayer = await this.apiService.getStoredPlayer(id).toPromise();
    this.destroyPlayer()
    if (storedPlayer.error) {
      this.error = true
    } else {
      this.error = false
      this.songID = storedPlayer.song_name
      this.sentiment = storedPlayer.emotion
      this.text = storedPlayer.text
      this.storedDatetime = storedPlayer.creation_time


      const [base64mp3, r2] = await Promise.all([
        this.apiService.getTextMP3(this.text).toPromise(),
        this.saveSong(this.songID)
      ])
      this.saveTextAudio(base64mp3.audioContent);
    }
    this.stored = true
    this.playerInvoked = false
  }

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
    this.stored = false
    this.error = false
    this.storedDatetime = '';
  }
}
