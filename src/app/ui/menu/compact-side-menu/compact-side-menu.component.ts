import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'coin-market-compact-side-menu',
  templateUrl: './compact-side-menu.component.html',
  styleUrls: ['./compact-side-menu.component.scss'],
})
export class CompactSideMenuComponent implements OnInit, OnDestroy {
  selectedItem: NbMenuItem;
  subscription: Subscription;
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

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _sideMenuService: NbMenuService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.selectedItem = this.items[0];

    this.subscription = this._sideMenuService.onItemSelect().subscribe((value) => {
      if (value.item.title === 'Dashboard') {
        this.selectedItem = this.items[0];
      }
    });
  }

  select(menuItem: NbMenuItem): void {
    this._router.navigate([menuItem.link], { relativeTo: this._activatedRoute });
    this.selectedItem = menuItem;
  }
}
