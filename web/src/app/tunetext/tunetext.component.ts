import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tunetext',
  templateUrl: './tunetext.component.html',
  styleUrls: ['./tunetext.component.css']
})
export class TunetextComponent implements OnInit {
  userText = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit(input:string) {
    this.userText = input;
  }
}
