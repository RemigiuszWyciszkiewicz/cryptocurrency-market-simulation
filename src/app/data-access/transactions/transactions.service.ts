import { Injectable, Injector } from '@angular/core';

import { ApiService } from '../api/api-service';

@Injectable()
export class TransactionsService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'transactions');
  }
}
