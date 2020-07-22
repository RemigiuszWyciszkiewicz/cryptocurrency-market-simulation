import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { Transaction } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly _tokenStorage: TokenStorageService,
    private readonly _cryptocurrencyService: CryptocurrencyService,
    private readonly _transactionsService: TransactionsService,
    private readonly _chartsService: ChartsService,
    private readonly _assetsService: AssetsService
  ) {}

  donutChartData: DonutChartData;
  transactions: Transaction[];
  transactionWidgetLoading = false;
  transactionWidgetError: HttpErrorResponse;

  ngOnInit(): void {
    this.getDonutChartData();
    this.getTransactionsListWidgetData();
  }

  getDonutChartData(): void {
    this._chartsService
      .getDonutChartData(this._tokenStorage.getId())
      .pipe(
        tap((value: DonutChartData) => {
          this.donutChartData = value;
          console.log(this.donutChartData);
        })
      )
      .subscribe();
  }

  getTransactionsListWidgetData(): void {
    this._transactionsService
      .getTransactions(this._tokenStorage.getId(), 15)
      .pipe(
        tap(
          (value: Transaction[]) => {
            this.transactions = value;
            console.log(this.transactions);
          },
          catchError((error: HttpErrorResponse) => {
            this.transactionWidgetError = error;
            return of(error);
          })
        )
      )
      .subscribe();
  }
}
