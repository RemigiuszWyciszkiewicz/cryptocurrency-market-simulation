import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { AssetSummary, PortfolioSummary, Transaction } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { UserQuery } from '@coin-market/data-access/user';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { combineLatest, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly _transactionsService: TransactionsService,
    private readonly _chartsService: ChartsService,
    private readonly _assetsService: AssetsService,
    private readonly _userQuery: UserQuery
  ) {}

  donutChartData: DonutChartData;
  portfolioSummary: PortfolioSummary;
  transactions: Transaction[];
  assetSummary: AssetSummary[];

  transactionWidgetLoading = false;
  transactionWidgetError: HttpErrorResponse;

  ngOnInit(): void {
    this.getDonutChartData();
    this.getTransactionsListWidgetData();
    this.getPortfolioSummary();
    this.getAssetsSummary();
  }

  getDonutChartData(): void {
    combineLatest([this._chartsService.getDonutChartData(this._userQuery.getId()), this._userQuery.selectUSD()])
      .pipe(
        map((value) => ({ labels: [...value[0].labels, 'USD'], values: [...value[0].values, value[1]] })),
        tap((value: DonutChartData) => {
          this.donutChartData = value;
        })
      )
      .subscribe();
  }

  getTransactionsListWidgetData(): void {
    this._transactionsService
      .getTransactions(this._userQuery.getId(), 15)
      .pipe(
        tap(
          (value: Transaction[]) => {
            this.transactions = value;
          },
          catchError((error: HttpErrorResponse) => {
            this.transactionWidgetError = error;
            return of(error);
          })
        )
      )
      .subscribe();
  }

  getPortfolioSummary(): void {
    this._assetsService.getPortforioSummary(this._userQuery.getId()).subscribe((value: PortfolioSummary) => {
      this.portfolioSummary = value;
    });
  }

  getAssetsSummary(): void {
    console.log('FETCH ASSETS');
    this._assetsService.getAssetsSummary(this._userQuery.getId()).subscribe((value: AssetSummary[]) => {
      this.assetSummary = value;
    });
  }
}
