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
      icon: {
        icon: 'chart-area',
        pack: 'font-awesome',
      },

      pathMatch: 'full',
    },
    {
      title: 'Market',
      link: '/pages/market',
      pathMatch: 'full',
      icon: {
        icon: 'coins',
        pack: 'font-awesome',
      },
    },
    {
      title: 'Rankings',
      link: '/pages/ranking',
      pathMatch: 'full',
      icon: {
        icon: 'award',
        pack: 'font-awesome',
      },
    },
    {
      title: 'Transactions history',
      link: '/pages/transactions-history',
      pathMatch: 'full',
      icon: {
        icon: 'folder-open',
        pack: 'font-awesome',
      },
    },
  ];

  constructor(private readonly _sideMenuService: NbMenuService) {}

  ngOnInit(): void {}
}
