import { NgModule } from "@angular/core";


import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatButtonModule } from '@angular/material/button'; // If using mat-button
import { MatInputModule } from '@angular/material/input'; // If using mat-input
import { MatSelectModule } from '@angular/material/select'; // If using mat-select
import { MatDatepickerModule } from '@angular/material/datepicker'; // If using mat-datepicker
import { MatNativeDateModule } from '@angular/material/core'; // If using native date format


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MatarialModule } from "./matarial/matarial.module";
import { TokenStorage } from "./util/token.storage";
import { JwtInterceptor } from "./interceptor/jwt.interceptor";
import { ErrorInterceptor } from "./interceptor/error.interceptor";
import { AuthenticationService } from "./services/authentication.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./component/root/login/login.component";
import { FooterComponent } from "./component/root/layout/footer/footer.component";
import { HeaderComponent } from "./component/root/layout/header/header.component";
import { ForgotPasswordComponent } from "./component/root/login/forgot-password/forgot-password.component";
import { AddNewPasswordComponent } from "./component/root/login/add-new-password/add-new-password.component";
import { ForgetUsernameComponent } from './component/root/login/forget-username/forget-username.component';
import { WebUtil } from './util/web.util';
import { RoleComponent } from './component/feature/umgr/role/role.component';
import { PrivilegeComponent } from './component/feature/umgr/privilege/privilege.component';
import { ToastrUtil } from './util/toastr.util';
import { MenuPrivilegeDialogComponent } from './component/feature/umgr/privilege/menu-privilege-dialog/menu-privilege-dialog.component';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
} from "ngx-ui-loader";
import { RolePrivilegeDialogComponent } from './component/feature/umgr/role/role-privilege-dialog/role-privilege-dialog.component';
import { BrowserModule } from "@angular/platform-browser";
import { ShiftDetailsComponent } from './component/feature/shift-details/shift-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchLprViolationDialogComponent } from './component/feature/shift-details/search-lpr-violation-dialog/search-lpr-violation-dialog.component';


import { AgmCoreModule } from '@agm/core';
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { ResetPasswordDialogComponent } from "./component/feature/user/user-reset-dialog/user-reset-dialog.component";
import { ResetPasswordVerify } from "./component/root/login/reset-password-verify/reset-password-verify";
import { licenseExpiryService } from "./services/license-expiry.service";
import { environment } from 'src/environments/environment';
import { ChartShiftDetailsComponent } from './component/feature/chart-shift-details/chart-shift-details.component';
import { ChartsModule } from 'ng2-charts';
import { ChartDailyShiftDetailsComponent } from './component/feature/chart-daily-shift-details/chart-daily-shift-details.component';
import { DashboardComponent } from './component/feature/dashboard/dashboard.component';
import { LiveSessionCountComponent } from './component/feature/dashboard/live-session-count/live-session-count.component';
import { LiveSessionBarChartComponent } from './component/feature/dashboard/live-session-bar-chart/live-session-bar-chart.component';
import { licenseExpiryComponent } from "./component/feature/license-expiry/license-expiry.component";
import { AddlicenseExpiryDialogComponent } from "./component/feature/license-expiry/add-license-expiry-dialog/add-license-expiry-dialog.component";
import { UpdateLicenseExpiryDialogComponent } from "./component/feature/license-expiry/update-license-expiry-dialog/update-license-expiry-dialog.component";
import { SharedModule } from "./sharedModules/shared/shared.module";
import { LicenseTableComponent } from "./component/feature/license-expiry/license-table/license-table.component";
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#ffffff",
  bgsOpacity: 0.5,
  bgsPosition: POSITION.centerCenter,
  bgsSize: 50,
  bgsType: SPINNER.threeBounce,
  blur: 10,
  delay: 0,
  fastFadeOut: true,
  fgsColor: "#ffffff",
  fgsPosition: POSITION.centerCenter,
  fgsSize: 50,
  fgsType: SPINNER.threeBounce,
  gap: 0,
  logoPosition: POSITION.centerCenter,
  logoSize: 100,
  logoUrl: "assets/images/olios_logo.png",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(30,30,47,0.9)",
  pbColor: "#ffffff",
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3,
  hasProgressBar: false,
  text: "",
  textColor: "#FFFFFF",
  textPosition: POSITION.centerCenter,
  maxTime: -1,
  minTime: 300
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AddNewPasswordComponent,
    ForgotPasswordComponent,
    ForgetUsernameComponent,
    RoleComponent,
    PrivilegeComponent,
    MenuPrivilegeDialogComponent,
    RolePrivilegeDialogComponent,
    ShiftDetailsComponent,
    SearchLprViolationDialogComponent,
    ResetPasswordDialogComponent,
    ResetPasswordVerify,
    ChartShiftDetailsComponent,
    ChartDailyShiftDetailsComponent,
    DashboardComponent,
    LiveSessionCountComponent,
    LiveSessionBarChartComponent,
    UpdateLicenseExpiryDialogComponent,
    AddlicenseExpiryDialogComponent,
    licenseExpiryComponent,
    LicenseTableComponent,

  

  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    NgxDaterangepickerMd.forRoot(),
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatarialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.MAP_API,
      libraries: ['places', 'drawing', 'geometry', 'visualization']
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      excludeRegexp: [
        "/api/lpr-raw/find-raw-data-images-by-sessionId/"
      ],
      showForeground:true,
      }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-left",
      preventDuplicates: false,
      disableTimeOut: false,
      easeTime: 500,
      //extendedTimeOut: 40000,
      newestOnTop: false,
      closeButton: true,
      maxOpened: 4,
      tapToDismiss: true,
    }),

    AppRoutingModule,


  ],
  providers: [
    AuthenticationService,
    TokenStorage,
    licenseExpiryService,
    ToastrService,
    WebUtil,
    ToastrUtil,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
