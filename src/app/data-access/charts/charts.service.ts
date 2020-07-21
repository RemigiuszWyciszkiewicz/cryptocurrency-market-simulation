import { Injectable, Injector } from '@angular/core';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';

@Injectable()
export class ChartsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'charts');
  }

  getDonutChartData(userId: string): Observable<DonutChartData> {
    return this.get<DonutChartData>(userId, 'donut');
  }
}
