import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { CryptocurrenciesService } from '@coin-market/data-access/cryptocurrencies';
import { CryptocurrencyDetails, News } from '@coin-market/data-access/models';
import { ID } from '@datorama/akita';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-cryptocurrency-details',
  templateUrl: './cryptocurrency-details.component.html',
  styleUrls: ['./cryptocurrency-details.component.scss'],
})
export class CryptocurrencyDetailsComponent implements OnInit {
  get id(): ID {
    return this._activatedRoute.snapshot.params.id;
  }

  cryptocurrencyDetails: CryptocurrencyDetails;
  news: News[];
  cryptocurrencyDetailsLinearChartData: number[][];

  linearChartLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  linearChartError: HttpErrorResponse;
  cryptocurrencyDetailsError: HttpErrorResponse;
  newsError: HttpErrorResponse;

  constructor(
    private readonly _cryprocurrenciesService: CryptocurrenciesService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _chartsService: ChartsService
  ) {}

  ngOnInit(): void {
    this.fetchNews();
    this.fetchCryptocurrencyDetails();
    this.fetchLinearChartData();
  }

  fetchLinearChartData(): void {
    this._chartsService
      .getLinearChartData(this.id)
      .pipe(
        map(this.compressArray),
        tap((value) => {
          this.cryptocurrencyDetailsLinearChartData = value;
        }),
        finalize(() => {
          this.linearChartLoading$.next(false);
        })
      )
      .subscribe();
  }

  fetchCryptocurrencyDetails(): void {
    this._cryprocurrenciesService
      .getCryptocurrencyDetails(this.id)
      .pipe(
        tap((value: CryptocurrencyDetails) => {
          this.cryptocurrencyDetails = value;
        }),
        catchError((error) => {
          this.cryptocurrencyDetailsError = error;
          return of(error);
        })
      )
      .subscribe();
  }

  fetchNews(): void {
    this._cryprocurrenciesService
      .getCryptocurrencyNews(this.id, 12)
      .pipe(
        tap((values: News[]) => {
          this.news = values;
        })
      )
      .subscribe();
  }

  compressArray(array: any): any {
    const arr = [];
    const delta = 12;
    for (let i = 0; i < array.length; i += delta) {
      arr.push(array[i]);
    }
    array = arr;
    return array;
  }
}
