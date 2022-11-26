import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MenegerPageComponent } from './pages/meneger-page/meneger-page.component';
import { UserPanelPageComponent } from './pages/user-panel-page/user-panel-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthGuard } from './auth.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AccountSettingsComponent } from './pages/user-panel-page/account-settings/account-settings.component';
import { HouseReservedComponent } from './pages/user-panel-page/house-reserved/house-reserved.component';
import { UserFavoriteComponent } from './pages/user-panel-page/user-favorite/user-favorite.component';
import { UserHousesComponent } from './pages/user-panel-page/user-houses/user-houses.component';
import { UserNewHouseComponent } from './pages/user-panel-page/user-new-house/user-new-house.component';
import { UserNewPasswordComponent } from './pages/user-panel-page/user-new-password/user-new-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manager',
    component: MenegerPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forbidden',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
