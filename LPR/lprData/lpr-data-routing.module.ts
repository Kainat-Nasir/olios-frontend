import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/helper/authentication.guard';
import { LprRawDataComponent } from './lpr-raw-data/lpr-raw-data.component';
import { SearchLprViolationComponent } from './search-lpr-violation/search-lpr-violation.component';

const routes: Routes = [
  { path: 'session-data', data:{role: "LPR Session Data"}, component:   LprRawDataComponent ,canActivate:[AuthenticationGuard]},
  { path: 'violation', data:{role: "LPR Violation"}, component:   SearchLprViolationComponent ,canActivate:[AuthenticationGuard]},
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LprDataRoutingModule { }
