import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type ActionBadgePosition =
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end';
type ActionBadgeStatus = 'primary' | 'info' | 'success' | 'warning' | 'danger';
type ActionTitlePosition = 'top' | 'right' | 'bottom' | 'left' | 'start' | 'end';

@Component({
  selector: 'coin-market-action',
  templateUrl: './action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionComponent {
  @Input() badgePosition: ActionBadgePosition = 'top right';

  @Input() badgeStatus: ActionBadgeStatus = 'danger';

  @Input() badgeText: string;

  @Input() href: string;

  @Input() icon: string;

  @Input() link: string;

  @Input() disabled = false;

  @Input() title: string;

  @Input() titlePosition: ActionTitlePosition = 'bottom';
}
