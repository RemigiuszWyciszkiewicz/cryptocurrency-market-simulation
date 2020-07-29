import { Component, EventEmitter, Input, Output } from '@angular/core';

type BadgeVariations = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

@Component({
  selector: 'coin-market-bootstrap-badge',
  templateUrl: './bootstrap-badge.component.html',
  styleUrls: ['./bootstrap-badge.component.scss'],
})
export class BootstrapBadgeComponent {
  @Output() clickEvent = new EventEmitter();
  @Input() variation: BadgeVariations = 'primary';
  @Input() emitEventOnClick: boolean;
}
