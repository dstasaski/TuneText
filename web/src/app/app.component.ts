import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  clickDefault = 'Weather information: ';
  clickMessage = '';
  playlistMessage = '';

  constructor(private apiService: ApiService) { }

  onClickMe() {
    this.apiService.getWeather().subscribe(data => {
      this.clickMessage = this.clickDefault + data.description;
    });
  }

  onClickPlaylist() {
    this.apiService.getPlaylist("party").subscribe(data => {
      this.playlistMessage = data.playlists.items[0].id;
    });
  }  
}
