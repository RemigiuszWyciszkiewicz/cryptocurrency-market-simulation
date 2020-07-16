import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'coin-market-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  isLoginFormVisible = true;

  constructor() {}

  ngOnInit(): void {}

  changeForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
}
