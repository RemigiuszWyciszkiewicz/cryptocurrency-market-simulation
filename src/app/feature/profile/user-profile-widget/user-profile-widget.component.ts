import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@coin-market/data-access/models';
import { UserQuery } from '@coin-market/data-access/user';
import { ConfirmationModalComponent } from '@coin-market/ui/modal/confirmation-modal/confirmation-modal.component';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'coin-market-user-profile-widget',
  templateUrl: './user-profile-widget.component.html',
  styleUrls: ['./user-profile-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileWidgetComponent implements OnInit {
  user$: Observable<Partial<User>>;

  constructor(private readonly _dialogService: NbDialogService, private readonly _userQuery: UserQuery) {}

  ngOnInit(): void {
    this.user$ = this._userQuery.selectUser();
  }

  resetAccount(): void {
    this._dialogService
      .open(ConfirmationModalComponent, {
        context: {
          action: { buttonText: 'Yes', preventAction: false, buttonType: 'primary' },
          title: 'Account data reseting',
          content: 'Are you sure you want to reset you account and restore it to inital state?',
        },
      })
      .onClose.subscribe(console.log);
  }
}
