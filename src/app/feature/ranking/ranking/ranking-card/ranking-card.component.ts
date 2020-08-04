import { Component, Input } from '@angular/core';
import { Ranking } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-ranking-card',
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.scss'],
})
export class RankingCardComponent {
  @Input() data: Ranking;
  @Input() highlighted;
}
