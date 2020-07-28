import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Subscription } from 'rxjs';

export enum Breakpoints {
  MAX_WIDTH_992_PX = '(max-width: 992px)',
  MIN_WIDTH_992_PX = '(min-width: 992px)',
  MAX_WIDTH_575_PX = '(max-width: 575px)',
  MIN_WIDTH_575_PX = '(min-width: 575px)',
}

export enum MenuState {
  COLLAPSED = 'collapsed',
  COMPACT = 'compact',
  EXTENDED = 'EXTENDED',
}

@Component({
  selector: 'coin-market-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  isCompact = false;
  isCollapsed = false;

  menuState: MenuState;

  subscription: Subscription;
  isScreenLarge = true;
  constructor(private sidebarService: NbSidebarService, private readonly _breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.subscription = this._breakpointObserver.observe([Breakpoints.MAX_WIDTH_992_PX]).subscribe((result) => {
      if (result.matches) {
        this.isScreenLarge = false;
      } else {
        this.isScreenLarge = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  toggleSidebar(): void {
    this.sidebarService.compact('extended');
  }

  onMenuExpand(): void {
    if (!this.isScreenLarge) {
      this.switchMenuOnSmallScreen();
    }
    if (this.isScreenLarge) {
      this.switchMenuOnLargeScreen();
    }
  }

  switchMenuOnSmallScreen(): void {
    if (this.isCompact) {
      this.sidebarService.collapse('extended');
      this.isCompact = false;
    } else {
      this.sidebarService.compact('extended');
      this.isCompact = true;
    }
  }

  switchMenuOnLargeScreen(): void {
    if (this.isCollapsed) {
      this.sidebarService.expand('extended');
      this.isCollapsed = false;
    } else {
      this.sidebarService.collapse('extended');
      this.isCollapsed = true;
    }
  }
}
