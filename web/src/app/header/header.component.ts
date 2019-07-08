import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  async onSubmit(playerId: string) {
    const storedPlayer = await this.getPlayer(playerId);
    console.log(storedPlayer.error);
    console.log(storedPlayer.song_name);
    console.log(storedPlayer.text);
  }

  async getPlayer(playerId: string) {
    return await this.apiService.getStoredPlayer(playerId).toPromise();
  }

}
