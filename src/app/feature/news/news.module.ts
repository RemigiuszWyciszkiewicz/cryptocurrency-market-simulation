import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: NewsComponent }])],
})
export class NewsModule {}
