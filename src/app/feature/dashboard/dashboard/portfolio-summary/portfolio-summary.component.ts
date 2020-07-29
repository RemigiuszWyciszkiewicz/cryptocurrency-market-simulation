import { Component, Input, OnInit } from '@angular/core';
import { PortfolioSummary } from '@coin-market/data-access/models';
import { UserQuery } from '@coin-market/data-access/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'coin-market-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss'],
})
export class PortfolioSummaryComponent implements OnInit {
  @Input() data: PortfolioSummary;
  usd$: Observable<number> = this._userQuery.selectUSD();

  get profitPercentage(): number {
    return ((this.data.totalPortfolioValue - 50000) / 50000) * 100;
  }

  constructor(private readonly _userQuery: UserQuery) {}

  ngOnInit(): void {}
}
