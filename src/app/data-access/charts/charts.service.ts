import { Injectable, Injector } from '@angular/core';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';

export interface CryptocurrencyDetailsLinearChartData {
  market_caps: number[][];
  prices: number[][];
  total_volumes: number[][];
}

@Injectable()
export class ChartsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'charts');
  }

  getDonutChartData(userId: ID): Observable<DonutChartData> {
    return this.get<DonutChartData>(userId, 'donut');
  }

  getLinearChartData(cryptoId: ID): Observable<CryptocurrencyDetailsLinearChartData> {
    return this.get<CryptocurrencyDetailsLinearChartData>(cryptoId, 'linear/cryptocurrency-details');
  }
}
