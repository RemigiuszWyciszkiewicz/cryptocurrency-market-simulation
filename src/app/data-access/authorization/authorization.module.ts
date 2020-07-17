import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthService, TokenStorageService],
})
export class AuthorizationModule {}
