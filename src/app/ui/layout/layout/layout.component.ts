import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';

export enum Breakpoints {
  MAX_WIDTH_992_PX = '(max-width: 992px)',
  MIN_WIDTH_992_PX = '(min-width: 992px)',
  MAX_WIDTH_575_PX = '(max-width: 575px)',
  MIN_WIDTH_575_PX = '(min-width: 575px)',
}

@Component({
  selector: 'coin-market-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  // private subscription: Subscription;

  sideMenuExpansion = new BehaviorSubject(true);

  constructor(private sidebarService: NbSidebarService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    // this.listenOnScreenResize();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  toggleSidebar(): void {
    // this.sidebarService.toggle(true, 'extended');
    //  this.sidebarService.compact('extended');
    this.sidebarService.compact('extended');
  }

  // listenOnScreenResize(): void {
  //   this.subscription = this.breakpointObserver
  //     .observe([...Object.values(Breakpoints)])
  //     .pipe(distinct())
  //     .subscribe((result) => {
  //       if (result.breakpoints[Breakpoints.MIN_WIDTH_992_PX]) {
  //         setTimeout(() => {
  //           this.sidebarService.expand('extended');
  //         }, 0);
  //         this.sideMenuExpansion.next(true);
  //       }
  //       if (result.breakpoints[Breakpoints.MAX_WIDTH_575_PX]) {
  //         setTimeout(() => {
  //           this.sidebarService.collapse('extended');
  //         }, 0);
  //       }
  //       if (result.breakpoints[Breakpoints.MIN_WIDTH_575_PX] && !result.breakpoints[Breakpoints.MIN_WIDTH_992_PX]) {
  //         setTimeout(() => {
  //           this.sidebarService.compact('extended');
  //         }, 0);

  //         this.sideMenuExpansion.next(false);
  //       }
  //     });
  // }
}
