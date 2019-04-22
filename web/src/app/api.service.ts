import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from '../models/weatherresponse';
import { SpotifyPlaylist } from '../models/spotify';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  weatherUrl = 'http://localhost:5000/api/weather'
  playlistUrl = 'http://localhost:5000/api/music/browse/categories/'
  constructor(private http: HttpClient) { }

  getWeather():Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.weatherUrl);
  }

  getPlaylist(category:string):Observable<SpotifyPlaylist> {
    return this.http.get<SpotifyPlaylist>(this.playlistUrl + category);
  }
}