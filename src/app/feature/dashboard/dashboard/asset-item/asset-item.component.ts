import { Component, Input, OnInit } from '@angular/core';
import { AssetSummary } from '@coin-market/data-access/models';

@Component({
  selector: 'coin-market-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.scss'],
})
export class AssetItemComponent implements OnInit {
  @Input() data: AssetSummary;

  get assetProfitPercentage(): number {
    return ((this.data.value - this.data.purchaseCost) / this.data.purchaseCost) * 100;
  }

  constructor() {}

  ngOnInit(): void {}
}
