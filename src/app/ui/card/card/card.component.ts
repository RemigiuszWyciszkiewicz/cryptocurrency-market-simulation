import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';

import { CardHeaderComponent } from '../card-header/card-header.component';

@Component({
  selector: 'coin-market-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @ContentChild(CardHeaderComponent, { static: true }) cardHeaderComponent: CardHeaderComponent;
  @Input() loading: boolean;
  @Input() spinnerStatus: string;
  @Input() loadingMinHeight;
  @Input() spinnerMessage = 'Loading...';

  get minHightWhileLoading(): object {
    return {
      height: this.loadingMinHeight && this.loading ? `${this.loadingMinHeight}rem` : 'auto',
    };
  }
}
