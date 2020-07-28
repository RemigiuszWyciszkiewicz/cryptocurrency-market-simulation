import { Component, Input } from '@angular/core';

type BadgeVariations = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

@Component({
  selector: 'coin-market-bootstrap-badge',
  templateUrl: './bootstrap-badge.component.html',
  styleUrls: ['./bootstrap-badge.component.scss'],
})
export class BootstrapBadgeComponent {
  @Input() linkUrl: string;
  @Input() variation: BadgeVariations = 'primary';
  @Input() pillTypeOn: boolean;
  @Input() linkOn: boolean;
}
