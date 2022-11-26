import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgIconsModule } from '@ng-icons/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
  bootstrapGithub,
  bootstrapExclamationTriangleFill,
  bootstrapBoxArrowRight,
  bootstrapHeart,
  bootstrapHeartFill,
  bootstrapX,
  bootstrapCheckSquareFill,
} from '@ng-icons/bootstrap-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MenegerPageComponent } from './pages/meneger-page/meneger-page.component';
import { UserPanelPageComponent } from './pages/user-panel-page/user-panel-page.component';
import { AngularToastifyModule } from 'angular-toastify';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavPopupComponent } from './components/nav-popup/nav-popup.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { HouseCardComponent } from './components/house-card/house-card.component';
import { UserRoutingModule } from './pages/user-panel-page/user-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    AdminPageComponent,
    MenegerPageComponent,
    UserPanelPageComponent,
    ErrorPageComponent,
    NotFoundPageComponent,
    LoginComponent,
    RegisterComponent,
    NavPopupComponent,
    DetailsModalComponent,
    HouseCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      bootstrapGithub,
      bootstrapExclamationTriangleFill,
      bootstrapBoxArrowRight,
      bootstrapHeart,
      bootstrapHeartFill,
      bootstrapX,
      bootstrapCheckSquareFill,
    }),
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    AppRoutingModule,
    AngularToastifyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
