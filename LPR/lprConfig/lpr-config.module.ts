import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/sharedModules/commonConfig.module';
import { LprCameraGroupComponent } from './lpr-camera-group/lpr-camera-group.component';
import { LprCameraListComponent } from './lpr-camera-list/lpr-camera-list.component';
import { LprConfigRoutingModule } from './lpr-config-routing.module';
import { LprAddPropertyDialogComponent } from './lpr-property/lpr-add-property-dialog/lpr-add-property-dialog.component';
import { LprPropertyUpdateDialogComponent } from './lpr-property/lpr-property-update-dialog/lpr-property-update-dialog.component';
import { LprPropertyComponent } from './lpr-property/lpr-property.component';
import { LprSubPropertyAddComponent } from './lpr-property/lpr-sub-property-add/lpr-sub-property-add.component';
import { LprWhitelistFileUploaderComponent } from './lpr-whitelist/lpr-whitelist-file-uploader/lpr-whitelist-file-uploader.component';
import { LprWhitelistComponent } from './lpr-whitelist/lpr-whitelist.component';


@NgModule({
  declarations: [
    LprPropertyComponent,
    LprAddPropertyDialogComponent,
    LprSubPropertyAddComponent,
    LprPropertyUpdateDialogComponent,
    LprWhitelistComponent,
    LprWhitelistFileUploaderComponent,
    LprCameraListComponent,
    LprCameraGroupComponent,
  ],
  imports: [
    LprConfigRoutingModule,
    CommonConfigModule,
    
  ]
})
export class LprConfigModule { }
