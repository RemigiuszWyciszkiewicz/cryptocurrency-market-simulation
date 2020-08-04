import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { Asset, PortfolioSummary, Transaction, UserRankingInformaton } from '@coin-market/data-access/models';
import { RankingService } from '@coin-market/data-access/ranking';
import { TransactionsQuery, TransactionsService, TransactionStore } from '@coin-market/data-access/transactions';
import { UserQuery } from '@coin-market/data-access/user';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly _transactionsService: TransactionsService,
    private readonly _transactionsStore: TransactionStore,
    private readonly _transactionsQuery: TransactionsQuery,
    private readonly _rankingService: RankingService,
    private readonly _chartsService: ChartsService,
    private readonly _assetsService: AssetsService,
    private readonly _userQuery: UserQuery,
    private readonly _render: Renderer2,
    private readonly _router: Router
  ) {}

  porfolioSummaryLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  assetsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  userRankingInformationLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  transactionsLoading$: Observable<boolean> = this._transactionsQuery.selectLoading();

  pageLoading$: Observable<boolean> = combineLatest([
    this.porfolioSummaryLoading$,
    this.userRankingInformationLoading$,
    this.transactionsLoading$,
    this.assetsLoading$,
  ]).pipe(
    map((value) => {
      console.log('', value);
      console.log(value[0] || value[1] || value[2] || value[3]);
      return value[0] || value[1] || value[2] || value[3];
    })
  );

  donutChartData: DonutChartData;
  portfolioSummary: PortfolioSummary;
  userRankingInformation: UserRankingInformaton;
  transactions$: Observable<Transaction[]> = this._transactionsQuery.selectAll();
  assets: Asset[];

  ngOnInit(): void {
    this.getDonutChartData();
    this.getTransactionsListWidgetData();
    this.getPortfolioSummary();
    this.getUserRankingInformation();
    this.getAssets();
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
        tap((value: Transaction[]) => {
          if (!this._transactionsQuery.hasEntity()) {
            this._transactionsStore.set(value);
          }
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      )
      .subscribe();
  }

  getPortfolioSummary(): void {
    this._assetsService
      .getPortforioSummary(this._userQuery.getId())
      .pipe(
        tap((value: PortfolioSummary) => {
          this.portfolioSummary = value;
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        }),
        finalize(() => {
          this.porfolioSummaryLoading$.next(false);
        })
      )
      .subscribe();
  }

  getAssets(): void {
    this._assetsService
      .getAllAssets(this._userQuery.getId())
      .pipe(
        tap((value: Asset[]) => {
          console.log(value);
          this.assets = value;
          this.assetsLoading$.next(false);
        }),
        catchError((error) => {
          console.log('', error);
          return of(error);
        }),
        finalize(() => {
          console.log('assets finalinze');
        })
      )
      .subscribe();
  }

  getUserRankingInformation(): void {
    this._rankingService
      .getUserRankingInformation(this._userQuery.getId())
      .pipe(
        tap((value: UserRankingInformaton) => {
          console.log(value);
          this.userRankingInformation = value;
          this.userRankingInformationLoading$.next(false);
        }),
        catchError((error) => {
          return of(error);
        }),
        finalize(() => {
          console.log('assets finalinze');
        })
      )
      .subscribe();
  }

  refreshDountChart(event: Event): void {
    this.getDonutChartData();
    this._render.addClass(event.target, 'animation');
  }

  redirectToMarketList(): void {
    this._router.navigate(['../pages/market']);
  }
}
