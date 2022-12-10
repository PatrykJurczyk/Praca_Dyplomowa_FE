import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import { UserPanelPageComponent } from './pages/user-panel-page/user-panel-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthGuard } from './auth.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserPanelPageComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/user-panel-page/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manager',
    component: ManagerPageComponent,
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
