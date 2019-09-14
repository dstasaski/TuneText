import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Base64MP3 } from 'src/models/mp3';
import { SongEncoding } from 'src/models/songencoding';
import { TextSong } from 'src/models/textsong';
import { StoredPlayer } from 'src/models/storedplayer';
import { SavePlayerResponse } from 'src/models/saveplayerresponse';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  textSpeechUrl = '/api/text_to_speech?text=';
  songUrl = '/songs/';
  textSongUrl = '/api/music/smartsong?text=';
  getPlayerUrl = '/api/dao/getplayer?id=';
  storePlayerUrl = '/api/dao/saveplayer'
  
  constructor(private http: HttpClient) { }

  getSongUrl(songID:string):string {
    return this.songUrl + songID;
  }

  getTextMP3(text:string):Observable<Base64MP3> {
    return this.http.get<Base64MP3>(this.textSpeechUrl + encodeURIComponent(text));
  }

  getSongEncoding():Observable<SongEncoding> {
    return this.http.get<SongEncoding>(this.songUrl);
  }

  getTextSong(text:string):Observable<TextSong> {
    return this.http.get<TextSong>(this.textSongUrl + encodeURIComponent(text));
  }

  getStoredPlayer(playerId:string):Observable<StoredPlayer> {
    return this.http.get<StoredPlayer>(this.getPlayerUrl + encodeURIComponent(playerId));
  }

  storePlayer(player:StoredPlayer):Observable<SavePlayerResponse> {
    return this.http.post<SavePlayerResponse>(this.storePlayerUrl, 
      {
        'text': player.text,
        'song_name': player.song_name,
        'emotion': player.emotion
      });
  }
}