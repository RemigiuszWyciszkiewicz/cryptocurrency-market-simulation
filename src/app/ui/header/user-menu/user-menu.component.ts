import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserQuery } from '@coin-market/data-access/user';
import { NbMenuItem } from '@nebular/theme';

import { UserMenuOption } from './user-menu-options';

@Component({
  selector: 'coin-market-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  constructor(private readonly _userQuery: UserQuery) {}

  username: string = this._userQuery.getValue().user.name;
  items: NbMenuItem[] = [
    { title: UserMenuOption.PROFILE, link: './pages/profile' },
    { title: UserMenuOption.LOGOUT, link: './hello' },
  ];
}
