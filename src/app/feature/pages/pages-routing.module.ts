import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@coin-market/core/authorization';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () => import('@coin-market/feature/profile').then((m) => m.ProfileModule),
      },
      {
        path: 'market',
        loadChildren: () => import('@coin-market/feature/market').then((m) => m.MarketModule),
      },
      {
        path: 'ranking',
        loadChildren: () => import('@coin-market/feature/ranking').then((m) => m.RankingModule),
      },
      {
        path: 'transactions-history',
        loadChildren: () => import('@coin-market/feature/transactions-history').then((m) => m.TransactionsHistoryModule),
      },
      {
        path: 'news',
        loadChildren: () => import('@coin-market/feature/news').then((m) => m.NewsModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@coin-market/feature/dashboard').then((m) => m.DashboardModule),
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
