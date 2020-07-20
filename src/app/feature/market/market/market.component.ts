import { Component, OnInit } from '@angular/core';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { Cryptocurrency } from '@coin-market/data-access/models/cryptocurrency';
import { Observable } from 'rxjs';

@Component({
  selector: 'coin-market-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  constructor(private readonly _cryptocurrencyService: CryptocurrencyService) {}

  cryptocurrencies$: Observable<Cryptocurrency[]>;

  ngOnInit(): void {
    this.cryptocurrencies$ = this._cryptocurrencyService.getAllCryptocurrencies();
  }

  buy(coinId: string): void {
    console.log(coinId);
  }
  sell(coinId: string): void {
    console.log(coinId);
  }
}
