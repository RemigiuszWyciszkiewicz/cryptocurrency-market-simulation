import { Component, OnInit } from '@angular/core';
import { CryptocurrenciesService } from '@coin-market/data-access/cryptocurrencies';
import { News } from '@coin-market/data-access/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'coin-market-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news$: Observable<News[]>;

  constructor(private readonly _cryptocurrenciesService: CryptocurrenciesService) {}

  ngOnInit(): void {
    this._cryptocurrenciesService.getCryptocurrencyNews('', 30).subscribe(console.log);
  }
}
