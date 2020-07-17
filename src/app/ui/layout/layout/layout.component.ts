import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'coin-market-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService) {}

  ngOnInit(): void {
    this.sidebarService.onToggle().pipe(startWith(true)).subscribe(console.log);
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(true, 'extended');
  }
}
