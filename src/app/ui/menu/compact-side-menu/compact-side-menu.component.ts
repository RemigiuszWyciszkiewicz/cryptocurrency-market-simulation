import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'coin-market-compact-side-menu',
  templateUrl: './compact-side-menu.component.html',
  styleUrls: ['./compact-side-menu.component.scss'],
})
export class CompactSideMenuComponent implements OnInit {
  selectedItem: NbMenuItem;
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

  constructor(private readonly _router: Router, private readonly _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedItem = this.items[0];
  }

  select(menuItem: NbMenuItem): void {
    this._router.navigate([menuItem.link], { relativeTo: this._activatedRoute });
    this.selectedItem = menuItem;
  }
}
