import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthService, TokenStorageService, AuthGuard],
})
export class AuthorizationModule {}
