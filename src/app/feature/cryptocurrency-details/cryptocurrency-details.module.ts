import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CryptocurrencyDetailsComponent } from './cryptocurrency-details.component';

@NgModule({
  declarations: [CryptocurrencyDetailsComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: CryptocurrencyDetailsComponent }])],
})
export class CryptocurrencyDetailsModule {}
