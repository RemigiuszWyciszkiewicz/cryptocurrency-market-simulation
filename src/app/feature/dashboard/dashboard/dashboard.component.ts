import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { Asset, PortfolioSummary, Transaction, UserRankingInformaton } from '@coin-market/data-access/models';
import { RankingService } from '@coin-market/data-access/ranking';
import { TransactionsQuery, TransactionsService, TransactionStore } from '@coin-market/data-access/transactions';
import { UserQuery, UserStore } from '@coin-market/data-access/user';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  get httpErrorResponse(): HttpErrorResponse {
    return this.assetsError || this.transactionsError || this.userRankingInformationError || this.porfolioSummaryError;
  }

  constructor(
    private readonly _transactionsService: TransactionsService,
    private readonly _transactionsStore: TransactionStore,
    private readonly _transactionsQuery: TransactionsQuery,
    private readonly _rankingService: RankingService,
    private readonly _chartsService: ChartsService,
    private readonly _assetsService: AssetsService,
    private readonly _userQuery: UserQuery,
    private readonly _userStore: UserStore,
    private readonly _render: Renderer2,
    private readonly _router: Router
  ) {}

  domutChartDataSubscription: Subscription;

  porfolioSummaryLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  assetsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  userRankingInformationLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  transactionsLoading$: Observable<boolean> = this._transactionsQuery.selectLoading();

  porfolioSummaryError: HttpErrorResponse;
  userRankingInformationError: HttpErrorResponse;
  transactionsError: HttpErrorResponse;
  assetsError: HttpErrorResponse;

  pageLoading$: Observable<boolean> = combineLatest([
    this.porfolioSummaryLoading$,
    this.userRankingInformationLoading$,
    this.transactionsLoading$,
    this.assetsLoading$,
  ]).pipe(
    map((value) => {
      return value[0] || value[1] || value[2] || value[3];
    })
  );

  donutChartData: DonutChartData;
  portfolioSummary: PortfolioSummary;
  userRankingInformation: UserRankingInformaton;
  transactions$: Observable<Transaction[]> = this._transactionsQuery.selectAll();
  assets: Asset[];

  ngOnInit(): void {
    this.fetchDonutChartData();
    this.fetchTransactionsListWidgetData();
    this.fetchPortfolioSummary();
    this.fetchUserRankingInformation();
    this.fetchAssets();
  }

  fetchDonutChartData(): void {
    this.domutChartDataSubscription = combineLatest([
      this._chartsService.getDonutChartData(this._userQuery.getId()),
      this._userQuery.selectUSD(),
    ])
      .pipe(
        map((value) => ({ labels: [...value[0].labels, 'USD'], values: [...value[0].values, value[1]] })),
        tap((value: DonutChartData) => {
          this.donutChartData = value;
        })
      )
      .subscribe();
  }

  fetchTransactionsListWidgetData(): void {
    this._transactionsService
      .getTransactions(this._userQuery.getId(), 15)
      .pipe(
        tap((value: Transaction[]) => {
          if (!this._transactionsQuery.hasEntity()) {
            this._transactionsStore.set(value);
          }
        }),
        catchError((error) => {
          this.transactionsError = error;
          return of(error);
        })
      )
      .subscribe();
  }

  fetchPortfolioSummary(): void {
    this._assetsService
      .getPortforioSummary(this._userQuery.getId())
      .pipe(
        tap((value: PortfolioSummary) => {
          this.portfolioSummary = value;
        }),
        catchError((error) => {
          this.porfolioSummaryError = error;
          return of(error);
        }),
        finalize(() => {
          this.porfolioSummaryLoading$.next(false);
        })
      )
      .subscribe();
  }

  fetchAssets(): void {
    this._assetsService
      .getAllAssets(this._userQuery.getId())
      .pipe(
        tap((value: Asset[]) => {
          this.assets = value;
        }),
        catchError((error) => {
          this.assetsError = error;
          return of(error);
        }),
        finalize(() => {
          this.assetsLoading$.next(false);
        })
      )
      .subscribe();
  }

  fetchUserRankingInformation(): void {
    this._rankingService
      .getUserRankingInformation(this._userQuery.getId())
      .pipe(
        tap((value: UserRankingInformaton) => {
          this.userRankingInformation = value;

          this._userStore.update((state) => ({ user: { ...state.user, userRank: value.rank } }));
        }),
        catchError((error) => {
          this.porfolioSummaryError = error;
          return of(error);
        }),
        finalize(() => {
          this.userRankingInformationLoading$.next(false);
        })
      )
      .subscribe();
  }

  refreshDountChart(event: Event): void {
    this.fetchDonutChartData();
    this._render.addClass(event.target, 'animation');
  }

  redirectToMarketList(): void {
    this._router.navigate(['../pages/market']);
  }

  ngOnDestroy(): void {
    this.domutChartDataSubscription.unsubscribe();
  }
}
