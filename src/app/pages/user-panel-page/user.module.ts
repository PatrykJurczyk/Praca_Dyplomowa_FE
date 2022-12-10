import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HouseReservedComponent } from './house-reserved/house-reserved.component';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserHousesComponent } from './user-houses/user-houses.component';
import { UserNewHouseComponent } from './user-new-house/user-new-house.component';
import { UserNewPasswordComponent } from './user-new-password/user-new-password.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared-module.module';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapHeartFill,
  bootstrapChevronDown,
  bootstrapChevronUp,
  bootstrapThreeDots,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    HouseReservedComponent,
    UserFavoriteComponent,
    UserHousesComponent,
    UserNewHouseComponent,
    UserNewPasswordComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
    NgIconsModule.withIcons({
      bootstrapHeartFill,
      bootstrapChevronDown,
      bootstrapChevronUp,
      bootstrapThreeDots,
      bootstrapXLg,
    }),
    ReactiveFormsModule,
  ],
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
