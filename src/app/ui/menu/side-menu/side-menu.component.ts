import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'coin-market-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      link: '/pages/dashboard',
      home: true,
      pathMatch: 'full',
    },
    {
      title: 'Market',
      link: '/pages/market',
      pathMatch: 'full',
    },
    {
      title: 'Rankings',
      link: '/pages/ranking',
      pathMatch: 'full',
    },
    {
      title: 'Transactions history',
      link: '/pages/transactions-history',
      pathMatch: 'full',
    },
  ];

  constructor(private readonly _sideMenuService: NbMenuService) {}

  ngOnInit(): void {
    this._sideMenuService.onItemClick().subscribe((value) => {});
    this._sideMenuService.getSelectedItem().subscribe(console.log);
    // this._sideMenuService.onItemHover().subscribe(console.log);
  }
}
