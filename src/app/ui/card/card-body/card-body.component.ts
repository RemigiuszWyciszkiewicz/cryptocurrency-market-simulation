import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'coin-market-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBodyComponent {}
