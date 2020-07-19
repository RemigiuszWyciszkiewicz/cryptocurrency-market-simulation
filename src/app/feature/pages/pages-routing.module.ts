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
