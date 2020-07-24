import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'coin-market-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() loading: boolean;
  @Input() spinnerStatus: string;
  @Input() spinnerMessage: string = 'Loading...';
}
