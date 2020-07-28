import { Injectable, Injector } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from '../api/api-service';
import { Asset, AssetSummary, PortfolioSummary } from '../models';

@Injectable()
export class AssetsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'assets');
  }

  getAllAssets(userId: ID): Observable<Asset[]> {
    return this.getAll<Asset>(String(userId));
  }

  getPortforioSummary(userId: ID): Observable<PortfolioSummary> {
    return this.get<PortfolioSummary>(userId, 'portforioSummary');
  }

  getAssetsSummary(userId: ID): Observable<AssetSummary[]> {
    return this.getAll<AssetSummary>('assetsSummary/' + userId).pipe(tap(console.log));
  }
}
