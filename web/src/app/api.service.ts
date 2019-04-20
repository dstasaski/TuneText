import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from '../models/weatherresponse';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configUrl = 'http://127.0.0.1:5000/api/weather'
  constructor(private http: HttpClient) { }

  getWeather():Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.configUrl);
  }
}