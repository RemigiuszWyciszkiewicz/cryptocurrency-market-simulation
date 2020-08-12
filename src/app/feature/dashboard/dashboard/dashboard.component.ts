import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { Asset, PortfolioSummary, Transaction, UserRankingInformaton } from '@coin-market/data-access/models';
import { RankingService } from '@coin-market/data-access/ranking';
import { TransactionsQuery, TransactionsService, TransactionStore } from '@coin-market/data-access/transactions';
import { UserQuery, UserStore } from '@coin-market/data-access/user';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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

  porfolioSummaryLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  assetsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  userRankingInformationLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  transactionsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  donutChartDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  porfolioSummaryError: HttpErrorResponse;
  userRankingInformationError: HttpErrorResponse;
  transactionsError: HttpErrorResponse;
  assetsError: HttpErrorResponse;

  assets$: Observable<Asset[]>;
  donutChartData$: Observable<DonutChartData>;
  portfolioSummary$: Observable<PortfolioSummary>;
  userRankingInformation$: Observable<UserRankingInformaton>;
  transactions$: Observable<Transaction[]> = this._transactionsQuery.selectAll();

  ngOnInit(): void {
    this.fetchDonutChartData();
    this.fetchTransactionsListWidgetData();
    this.fetchPortfolioSummary();
    this.fetchUserRankingInformation();
    this.fetchAssets();
  }

  fetchDonutChartData(): void {
    this.donutChartData$ = forkJoin([
      this._chartsService.getDonutChartData(this._userQuery.getId()),
      this._userQuery.selectUSD().pipe(take(1)),
    ]).pipe(
      map((value) => ({ labels: [...value[0].labels, 'USD'], values: [...value[0].values, value[1]] })),
      finalize(() => this.donutChartDataLoading$.next(false))
    );
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
        }),
        finalize(() => {
          this.transactionsLoading$.next(false);
        })
      )
      .subscribe();
  }

  fetchPortfolioSummary(): void {
    this.portfolioSummary$ = this._assetsService.getPortforioSummary(this._userQuery.getId()).pipe(
      tap(() => {}),
      catchError((error) => {
        this.porfolioSummaryError = error;
        return of(error);
      }),
      finalize(() => {
        this.porfolioSummaryLoading$.next(false);
      })
    );
  }

  fetchAssets(): void {
    this.assets$ = this._assetsService.getAllAssets(this._userQuery.getId()).pipe(
      tap(() => {}),
      catchError((error) => {
        this.assetsError = error;
        return of(error);
      }),
      finalize(() => {
        this.assetsLoading$.next(false);
      })
    );
  }

  fetchUserRankingInformation(): void {
    this.userRankingInformation$ = this._rankingService.getUserRankingInformation(this._userQuery.getId()).pipe(
      tap((value: UserRankingInformaton) => {
        this._userStore.update((state) => ({ user: { ...state.user, userRank: value.rank } }));
      }),
      catchError((error) => {
        this.porfolioSummaryError = error;
        return of(error);
      }),
      finalize(() => {
        this.userRankingInformationLoading$.next(false);
      })
    );
  }

  refreshDountChart(event: Event): void {
    this.fetchDonutChartData();
    this._render.addClass(event.target, 'animation');
  }

  redirectToMarketList(): void {
    this._router.navigate(['../pages/market']);
  }
}
