import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'coin-market-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuExpand = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
