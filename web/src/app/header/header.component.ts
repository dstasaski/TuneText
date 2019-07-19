import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  text = '';

  constructor(private apiService:ApiService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(playerId: string) {
    this.router.navigate(['/player'], { queryParams: { id: playerId } });
  }
}
