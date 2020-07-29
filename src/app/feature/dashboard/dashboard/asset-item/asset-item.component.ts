import { Component, Input, OnInit } from '@angular/core';
import { AssetSummary } from '@coin-market/data-access/models';
import { TransactionsService } from '@coin-market/data-access/transactions';

@Component({
  selector: 'coin-market-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.scss'],
})
export class AssetItemComponent implements OnInit {
  constructor(private readonly _transactionsService: TransactionsService) {}

  @Input() data: AssetSummary;

  get assetProfitPercentage(): number {
    return ((this.data.value - this.data.purchaseCost) / this.data.purchaseCost) * 100;
  }

  ngOnInit(): void {}

  buy(): void {
    // this._transactionsService.buy();
  }

  sell(): void {}
}
