import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MoodyBeats';
  clickDefault = 'Weather information:'
  clickMessage = ''

  onClickMe() {
    this.clickMessage = this.clickDefault + 'button clicked!';
  }
}
