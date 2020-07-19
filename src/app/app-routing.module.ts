import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@coin-market/ui/error-components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('@coin-market/feature/pages').then((m) => m.PagesModule),
  },
  {
    path: 'hello',
    loadChildren: () => import('@coin-market/feature/start-page').then((m) => m.StartPageModule),
  },

  { path: '**', redirectTo: 'not-found-page' },
  { path: 'not-found-page', component: NotFoundPageComponent },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
