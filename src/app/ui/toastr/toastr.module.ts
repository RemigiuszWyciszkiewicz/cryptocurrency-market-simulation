import { NgModule } from '@angular/core';
import { GlobalConfig, ToastrModule as NgxToastrModule } from 'ngx-toastr';

const TOASTR_CONFIG: Partial<GlobalConfig> = { timeOut: 1500, positionClass: '.toast-bottom-left' };

@NgModule({
  declarations: [],
  imports: [NgxToastrModule.forRoot(TOASTR_CONFIG)],
})
export class ToastrModule {}
