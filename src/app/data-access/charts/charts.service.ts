import { Injectable, Injector } from '@angular/core';
import { DonutChartData } from '@coin-market/ui/charts/donut-chart/donut-chart.component';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';

@Injectable()
export class ChartsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'charts');
  }

  getDonutChartData(userId: ID): Observable<DonutChartData> {
    return this.get<DonutChartData>(userId, 'donut');
  }
}
