import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'coin-market-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input() header = 'Oops!';
  @Input() status: number;
  @Input() message: string;
  @Input() hint: string;
  @Input() showBackLink = true;
  @Input() backLinkLabel: string;
  @Input() backLinkUrl = '/';
}
