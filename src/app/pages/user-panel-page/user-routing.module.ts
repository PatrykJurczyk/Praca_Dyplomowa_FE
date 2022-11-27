import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPanelPageComponent } from './user-panel-page.component';
import { AuthGuard } from '../../auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HouseReservedComponent } from './house-reserved/house-reserved.component';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserHousesComponent } from './user-houses/user-houses.component';
import { UserNewHouseComponent } from './user-new-house/user-new-house.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserPanelPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'settings', component: AccountSettingsComponent },
      { path: 'house-reserved', component: HouseReservedComponent },
      { path: 'favorite', component: UserFavoriteComponent },
      { path: 'my-houses', component: UserHousesComponent },
      { path: 'new-house', component: UserNewHouseComponent },
      //todo nowe hasło będzie jako popup wyświetlane
      // { path: 'new-password', component: UserNewPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
