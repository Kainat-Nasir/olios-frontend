import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonConfigModule } from 'src/app/sharedModules/commonConfig.module';
import { LprDataRoutingModule } from './lpr-data-routing.module';
import { LprRawDataDialogComponent } from './lpr-raw-data/lpr-raw-data-dialog/lpr-raw-data-dialog.component';
import { LprRawDataComponent } from './lpr-raw-data/lpr-raw-data.component';
import { SearchLprViolationDialogComponent } from './search-lpr-violation/search-lpr-violation-dialog/search-lpr-violation-dialog.component';
import { SearchLprViolationComponent } from './search-lpr-violation/search-lpr-violation.component';

@NgModule({
  declarations: [
    SearchLprViolationComponent,
    SearchLprViolationDialogComponent,
    LprRawDataComponent,
    LprRawDataDialogComponent
  ],
  imports: [  
    LprDataRoutingModule,
    NzDatePickerModule,
    CommonConfigModule
  ],
  providers: [
    DatePipe
  ]
})
export class LprDataModule { }
