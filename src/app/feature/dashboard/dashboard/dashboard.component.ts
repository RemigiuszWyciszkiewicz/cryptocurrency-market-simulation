import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@coin-market/core/authorization';
import { AssetsService } from '@coin-market/data-access/assets/assets.service';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'coin-market-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly _tokenStorage: TokenStorageService,
    private readonly _cryptocurrencyService: CryptocurrencyService,
    private readonly _chartsService: ChartsService,
    private readonly _assetsService: AssetsService
  ) {}

  donutChartData: DonutChartData;

  ngOnInit(): void {
    this._chartsService
      .getDonutChartData(this._tokenStorage.getId())
      .pipe(
        tap((value: DonutChartData) => {
          this.donutChartData = value;
          console.log(this.donutChartData);
        })
      )
      .subscribe();
  }
}
