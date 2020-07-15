import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
