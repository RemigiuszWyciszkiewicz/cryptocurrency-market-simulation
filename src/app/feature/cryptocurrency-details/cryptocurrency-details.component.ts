import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '@coin-market/data-access/charts/charts.service';
import { CryptocurrencyService } from '@coin-market/data-access/cryptocurrency';
import { CryptocurrencyDetails, News } from '@coin-market/data-access/models';
import { ID } from '@datorama/akita';
import { map, tap } from 'rxjs/operators';

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
  linearChartLoading = true;

  constructor(
    private readonly _cryprocurrenciesService: CryptocurrencyService,

    private readonly _activatedRoute: ActivatedRoute,
    private readonly _chartsService: ChartsService
  ) {}

  ngOnInit(): void {
    this.getNews();
    this._cryprocurrenciesService.getCryptocurrencyDetails(this.id).subscribe((value: CryptocurrencyDetails) => {
      this.cryptocurrencyDetails = value;
    });

    this._chartsService
      .getLinearChartData(this.id)
      .pipe(map(this.compressArray))
      .subscribe((value) => {
        this.cryptocurrencyDetailsLinearChartData = value;
        this.linearChartLoading = false;
      });
  }

  getNews(): void {
    this._cryprocurrenciesService
      .getCryptocurrencyNews(this.id)
      .pipe(
        tap((values: News[]) => {
          this.news = values;
        })
      )
      .subscribe(console.log);
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
