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
      title: 'Dashboard',
      link: './',
      home: true,
    },
    {
      title: 'Market',
      link: './market',
    },
    {
      title: 'Rankings',
      link: './ranks',
    },
    {
      title: 'History',
      link: './user-history',
    },
    {
      title: 'Profile',
      link: './profile',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
