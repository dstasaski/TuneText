import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from 'src/models/weatherresponse';
import { SpotifyPlaylist } from 'src/models/spotify';
import { Observable } from 'rxjs';
import { Base64MP3 } from 'src/models/mp3';
import { SongEncoding } from 'src/models/songencoding';
import { TextSong } from 'src/models/textsong';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base = 'http://localhost:5000';
  weatherUrl = this.base + '/api/weather';
  playlistUrl = this.base + '/api/music/browse/categories/';
  textSpeechUrl = this.base + '/api/text_to_speech/';
  songUrl = this.base + '/api/music/song/';
  textSongUrl = this.base + '/api/music/smartsong/';
  
  constructor(private http: HttpClient) { }

  getSongUrl(songID:string):string {
    return this.songUrl + songID;
  }

  getWeather():Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.weatherUrl);
  }

  getPlaylist(category:string):Observable<SpotifyPlaylist> {
    return this.http.get<SpotifyPlaylist>(this.playlistUrl + category);
  }

  getTextMP3(text:string):Observable<Base64MP3> {
    return this.http.get<Base64MP3>(this.textSpeechUrl + text);
  }

  getSongEncoding():Observable<SongEncoding> {
    return this.http.get<SongEncoding>(this.songUrl)
  }

  getTextSong(text:string):Observable<TextSong> {
    return this.http.get<TextSong>(this.textSongUrl + text);
  }
}