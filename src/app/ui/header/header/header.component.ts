import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'coin-market-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private readonly _router: Router, private readonly _sideMenuService: NbMenuService) {}
  @Output() menuExpand = new EventEmitter();

  redirectToDashboard(): void {
    this._sideMenuService.navigateHome();
  }
}
