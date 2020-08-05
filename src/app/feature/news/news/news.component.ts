import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CryptocurrenciesService } from '@coin-market/data-access/cryptocurrencies';
import { News } from '@coin-market/data-access/models';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News[];
  loading = false;

  error: HttpErrorResponse;

  constructor(private readonly _cryptocurrenciesService: CryptocurrenciesService) {}

  ngOnInit(): void {
    this.loading = true;
    this._cryptocurrenciesService
      .getCryptocurrencyNews('', 32)
      .pipe(
        tap((value) => {
          this.news = value;
        }),
        catchError((error) => {
          this.error = error;
          return of(error);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
