import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StoredPlayer } from 'src/models/storedplayer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  text = '';

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  async onSubmit(playerId: string) {
    console.log("value: " + playerId)
    const storedPlayer: StoredPlayer = await this.getPlayer(playerId);
    console.log(storedPlayer.error);
    console.log(storedPlayer.song_name);
    console.log(storedPlayer.text);
    console.log(storedPlayer.emotion);
  }

  async getPlayer(playerId: string) {
    return await this.apiService.getStoredPlayer(playerId).toPromise();
  }

}
