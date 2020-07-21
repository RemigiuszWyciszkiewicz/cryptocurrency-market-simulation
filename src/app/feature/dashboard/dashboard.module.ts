import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssetsModule } from '@coin-market/data-access/assets';
import { ChartsModule as ChartsModuleDataAccess } from '@coin-market/data-access/charts';
import { CryptocurrencyModule } from '@coin-market/data-access/cryptocurrency';
import { ChartsModule } from '@coin-market/ui/charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, ChartsModule, CryptocurrencyModule, AssetsModule, ChartsModuleDataAccess],
})
export class DashboardModule {}
