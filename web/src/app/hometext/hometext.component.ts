import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hometext',
  templateUrl: './hometext.component.html',
  styleUrls: ['./hometext.component.css']
})
export class HometextComponent implements OnInit {
  title = 'Tune my Text!';
  constructor() { }

  ngOnInit() {
  }

}
