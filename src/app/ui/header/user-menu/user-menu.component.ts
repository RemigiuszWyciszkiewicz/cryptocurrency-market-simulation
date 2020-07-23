import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { UserMenuOption } from './user-menu-options';

@Component({
  selector: 'coin-market-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  items: NbMenuItem[] = [
    { title: UserMenuOption.PROFILE, link: './pages/profile' },
    { title: UserMenuOption.LOGOUT, link: './hello' },
  ];
}
