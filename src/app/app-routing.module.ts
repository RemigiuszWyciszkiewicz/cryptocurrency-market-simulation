import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'test',
    loadChildren: () =>
      import('./crypto-data-access/crypto-data-access.module').then(
        (m) => m.CryptoDataAccessModule
      ),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
