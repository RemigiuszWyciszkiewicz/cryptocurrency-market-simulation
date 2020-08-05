import { Injectable, Injector } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api-service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService {
  constructor(injector: Injector) {
    super(injector, 'user');
  }

  checkUserTokenValidity(userId: ID): Observable<User> {
    return this.post<any>({}, 'tokenValidation/' + userId);
  }

  resetAccount(userId: ID): Observable<User> {
    return this.put<any>(userId, {}, 'accountReset');
  }
}
