import { Injectable, Injector } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { Asset, PortfolioSummary } from '../models';

@Injectable()
export class AssetsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'assets');
  }

  getAllAssets(userId: ID): Observable<Asset[]> {
    return this.getAll<Asset>(String(userId));
  }

  getPortforioSummary(userId: ID): Observable<PortfolioSummary> {
    return this.get<PortfolioSummary>(userId, 'portforioSummaryData');
  }
}
