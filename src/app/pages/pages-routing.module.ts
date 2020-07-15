import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NotFoundPageComponent } from '../ui/error-components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('src/app/feature/profile/index').then((m) => m.ProfileModule),
      },

      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'not-found-page' },
      { path: 'not-found-page', component: NotFoundPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
