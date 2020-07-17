import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'coin-market-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Profile',
      link: './',
      home: true,
    },
    {
      title: 'Coin Market',
      link: './coin-market-list',
    },
    {
      title: 'Rankings',
      link: './ranks',
    },
    {
      title: 'History',
      link: './user-history',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
