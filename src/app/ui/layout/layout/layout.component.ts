import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'coin-market-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService) {}
  toggle = false;

  ngOnInit(): void {
    this.sidebarService.toggle(this.toggle);
    this.sidebarService.onToggle().subscribe(console.log);
  }
  test() {
    if (this.toggle) {
      this.toggle = false;
    } else {
      this.toggle = true;
    }
  }
}
