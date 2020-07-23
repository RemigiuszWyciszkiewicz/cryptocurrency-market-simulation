import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@coin-market/ui/forms';
import { NbCardModule } from '@nebular/theme';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserProfileWidgetComponent } from './user-profile-widget/user-profile-widget.component';

@NgModule({
  declarations: [ProfileComponent, UserProfileWidgetComponent],
  imports: [CommonModule, ProfileRoutingModule, NbCardModule, FormsModule],
})
export class ProfileModule {}
