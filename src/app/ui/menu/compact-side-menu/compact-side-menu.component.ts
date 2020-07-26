import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'coin-market-compact-side-menu',
  templateUrl: './compact-side-menu.component.html',
  styleUrls: ['./compact-side-menu.component.scss'],
})
export class CompactSideMenuComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      link: './',
      icon: 'fas fa-chart-area',
      home: true,
    },
    {
      title: 'Market',
      link: './market',
      icon: 'fas fa-coins',
    },
    {
      title: 'Rankings',
      link: './ranking',
      icon: 'fas fa-award',
    },
    {
      title: 'Transactions history',
      link: './transactions-history',
      icon: 'fas fa-folder-open',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
