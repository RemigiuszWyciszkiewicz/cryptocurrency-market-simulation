import { Component, Input } from '@angular/core';
import { UserRankingInformaton } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-user-rank-widget',
  templateUrl: './user-rank-widget.component.html',
  styleUrls: ['./user-rank-widget.component.scss'],
})
export class UserRankWidgetComponent {
  @Input() data: UserRankingInformaton;
}
