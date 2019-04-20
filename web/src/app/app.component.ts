import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'MoodyBeats';
  clickDefault = 'Weather information: ';
  clickMessage = '';


  constructor(private apiService: ApiService) { }

  onClickMe() {
    this.apiService.getWeather().subscribe(data => {
      this.clickMessage = this.clickDefault + data.description;
    });
  }
}
