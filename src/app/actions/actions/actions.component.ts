import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';

import { ActionComponent } from '../action/action.component';

type ActionsSize = 'tiny' | 'small' | ' medium' | 'large' | 'giant';

@Component({
  selector: 'coin-market-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @ContentChildren(ActionComponent, { descendants: true }) aumsDigitalActions: QueryList<ActionComponent>;

  @Input() size: ActionsSize = 'small';

  @Input() fullWidth = false;
}
