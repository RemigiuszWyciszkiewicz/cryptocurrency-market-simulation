import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { CryptoDataAccessRoutingModule } from './crypto-data-access-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, CryptoDataAccessRoutingModule, RouterModule],
})
export class CryptoDataAccessModule {}
