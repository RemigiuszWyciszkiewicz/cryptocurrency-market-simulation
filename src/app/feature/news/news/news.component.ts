import { Component, OnInit } from '@angular/core';
import { CryptocurrenciesService } from '@coin-market/data-access/cryptocurrencies';
import { News } from '@coin-market/data-access/models';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News[];
  pageLoading = true;

  constructor(private readonly _cryptocurrenciesService: CryptocurrenciesService) {}

  ngOnInit(): void {
    this._cryptocurrenciesService
      .getCryptocurrencyNews('', 32)
      .pipe(
        tap((value) => {
          this.news = value;
        }),
        finalize(() => {
          this.pageLoading = false;
        })
      )
      .subscribe();
  }
}
