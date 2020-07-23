import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@coin-market/data-access/models';
import { UserQuery } from '@coin-market/data-access/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'coin-market-user-profile-widget',
  templateUrl: './user-profile-widget.component.html',
  styleUrls: ['./user-profile-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileWidgetComponent implements OnInit {
  constructor(private readonly _userQuery: UserQuery) {}

  user$: Observable<Partial<User>>;
  ngOnInit(): void {
    this.user$ = this._userQuery.selectUser();
  }
}
