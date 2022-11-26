import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HouseReservedComponent } from './house-reserved/house-reserved.component';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserHousesComponent } from './user-houses/user-houses.component';
import { UserNewHouseComponent } from './user-new-house/user-new-house.component';
import { UserNewPasswordComponent } from './user-new-password/user-new-password.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    HouseReservedComponent,
    UserFavoriteComponent,
    UserHousesComponent,
    UserNewHouseComponent,
    UserNewPasswordComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
  exports: [
    AccountSettingsComponent,
    HouseReservedComponent,
    UserFavoriteComponent,
    UserHousesComponent,
    UserNewHouseComponent,
    UserNewPasswordComponent,
  ],
})
export class UserModule {}
