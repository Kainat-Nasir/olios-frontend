import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';
import { LprCameraGroupComponent } from './lpr-camera-group/lpr-camera-group.component';
import { LprCameraListComponent } from './lpr-camera-list/lpr-camera-list.component';
// import { LprPropertyComponent } from './lpr-property/lpr-property.component';
import { LprWhitelistComponent } from './lpr-whitelist/lpr-whitelist.component';

const routes: Routes = [
  //{ path: 'property', data:{role : "Lpr Property"}, component:   LprPropertyComponent ,canActivate:[AuthenticationGuard]},
  { path: 'camera-list', data:{role : "LPR Camera List"}, component:   LprCameraListComponent ,canActivate:[AuthenticationGuard]},
  { path: 'camera-group', data:{role : "LPR Camera Group"}, component:   LprCameraGroupComponent ,canActivate:[AuthenticationGuard]},
  { path: 'registered-vehicle', data:{role : "Digital Permit Management"}, component:   LprWhitelistComponent ,canActivate:[AuthenticationGuard]},

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class LprConfigRoutingModule { }
