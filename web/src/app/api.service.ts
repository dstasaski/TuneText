import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from '../models/weatherresponse';
import { SpotifyPlaylist } from '../models/spotify';
import { Observable } from 'rxjs';
import { Base64MP3 } from 'src/models/mp3';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  weatherUrl = 'http://localhost:5000/api/weather'
  playlistUrl = 'http://localhost:5000/api/music/browse/categories/'
  textSpeechUrl = 'http://localhost:5000/api/text_to_speech/'

  constructor(private http: HttpClient) { }

  getWeather():Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.weatherUrl);
  }

  getPlaylist(category:string):Observable<SpotifyPlaylist> {
    return this.http.get<SpotifyPlaylist>(this.playlistUrl + category);
  }

  getTextMP3(text:string):Observable<Base64MP3> {
    return this.http.get<Base64MP3>(this.textSpeechUrl + text);
  }
}