import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddNewPasswordComponent } from "./component/root/login/add-new-password/add-new-password.component";
import { ForgotPasswordComponent } from "./component/root/login/forgot-password/forgot-password.component";
import { CustomPreloadingService } from "./customPreloading/custom-preloading.service";
import { ForgetUsernameComponent } from './component/root/login/forget-username/forget-username.component';
import { RoleComponent } from './component/feature/umgr/role/role.component';
import { PrivilegeComponent } from './component/feature/umgr/privilege/privilege.component';
import { MenuComponent } from "./component/feature/umgr/menu/menu.component";
import { LoginComponent } from "./component/root/login/login.component";
import { AccessDenied } from "./component/root/layout/access-denied/access-denied.component";
import { AuthenticationGuard } from "./helper/authentication.guard";
import { ShiftDetailsComponent } from "./component/feature/shift-details/shift-details.component";
import { ResetPasswordVerify } from "./component/root/login/reset-password-verify/reset-password-verify";
import { ChartShiftDetailsComponent } from "./component/feature/chart-shift-details/chart-shift-details.component";
import { ChartDailyShiftDetailsComponent } from "./component/feature/chart-daily-shift-details/chart-daily-shift-details.component";
import { DashboardComponent } from "./component/feature/dashboard/dashboard.component";
import { licenseExpiryComponent } from "./component/feature/license-expiry/license-expiry.component";

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "add-new-password", component: AddNewPasswordComponent },
  { path: "forget-password", component: ForgotPasswordComponent },
  { path: "forget-username", component: ForgetUsernameComponent },
  { path: "admin/role", component: RoleComponent },
  { path: "admin/privilege", component: PrivilegeComponent },
  { path: "admin/menu", component: MenuComponent },
  { path: "access-denied", component: AccessDenied },
  { path: "shift-details", component: ShiftDetailsComponent },
  { path: "chart-shift-details", component: ChartShiftDetailsComponent },
  { path: "chart-daily-shift-details", component: ChartDailyShiftDetailsComponent },
  { path: "reset-password-verify/:token", component: ResetPasswordVerify},
  { path: "dashboard-organization", component: DashboardComponent},
  {path: "license-management", component:licenseExpiryComponent},
  {
    path: "user", data: { preload: false, role:"User" }, loadChildren: () =>
      import("./component/feature/user/user.module").then((m) => m.UserModule),
  },

  {
    path: "organization", data: { preload: false,role: "Organization"}, loadChildren: () =>
      import("./component/feature/organization/organization.module").then((m) => m.OrganizationModule),
  },

  {
    path: "admin/preference", data: { preload: false }, loadChildren: () =>
      import("./component/feature/preference/preference.module").then(
        (m) => m.PreferenceModule),
  },

  {
    path: 'lpr-config', loadChildren: () =>
      import('./component/feature/LPR/lprConfig/lpr-config.module').then(
        m => m.LprConfigModule)
  },

  // {
  //   path: "lpr-data", data: { preload: false}, loadChildren: () =>
  //     import("./component/feature/LPR/lprData/lpr-data.module").then(
  //       (m) => m.LprDataModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: false,
      preloadingStrategy: CustomPreloadingService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
