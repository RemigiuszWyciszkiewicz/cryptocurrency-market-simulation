import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { Asset } from '../models';

@Injectable()
export class AssetsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'assets');
  }

  getAllAssets(userId: string): Observable<Asset[]> {
    return this.getAll<Asset>(userId);
  }
}
