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
} from '@ng-icons/bootstrap-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MenegerPageComponent } from './pages/meneger-page/meneger-page.component';
import { UserPanelPageComponent } from './pages/user-panel-page/user-panel-page.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavPopupComponent } from './components/nav-popup/nav-popup.component';
import { UserRoutingModule } from './pages/user-panel-page/user-routing.module';
import { SharedModule } from './shared-module.module';
import { UserModule } from './pages/user-panel-page/user.module';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      bootstrapGithub,
      bootstrapExclamationTriangleFill,
      bootstrapBoxArrowRight,
    }),
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    AppRoutingModule,
    AngularToastifyModule,
    SharedModule,
    UserModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
