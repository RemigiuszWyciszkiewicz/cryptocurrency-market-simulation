import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketComponent } from './market/market.component';

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('@coin-market/feature/cryptocurrency-details').then((m) => m.CryptocurrencyDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}
