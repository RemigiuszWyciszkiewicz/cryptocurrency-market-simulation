import { Component, Input, OnInit } from '@angular/core';
import { PortfolioSummary } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss'],
})
export class PortfolioSummaryComponent implements OnInit {
  @Input() data: PortfolioSummary;

  get profitPercentage(): number {
    if (this.data.totalPortfolioValue < 50000) {
      return 1 - (this.data.totalPortfolioValue / 50000) * 100;
    }
    return (this.data.totalPortfolioValue / 50000) * 100;
  }

  constructor() {}

  ngOnInit(): void {}
}
