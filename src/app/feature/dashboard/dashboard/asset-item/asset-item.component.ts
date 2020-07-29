import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptocurrenciesQuery } from '@coin-market/data-access/cryptocurrency';
import { Asset, Cryptocurrency } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';

@Component({
  selector: 'coin-market-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.scss'],
})
export class AssetItemComponent {
  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _transactionsService: TransactionsService,
    private readonly _cryptocurrenciesQuery: CryptocurrenciesQuery
  ) {}

  @Input() data: Asset;

  get assetProfitPercentage(): number {
    return ((this.data.value - this.data.purchaseCost) / this.data.purchaseCost) * 100;
  }

  buy(): void {
    this._transactionsService.buy(this.getCryprocurencyFromQuery(), this.data);
  }

  getCryprocurencyFromQuery(): Cryptocurrency {
    return this._cryptocurrenciesQuery.getCryptocurrency(this.data.id);
  }

  sell(): void {
    this._transactionsService.sell(this.getCryprocurencyFromQuery(), this.data);
  }

  redirectToDetails(): void {
    this._router.navigate([this.data.id], { relativeTo: this._activatedRoute });
  }
}
