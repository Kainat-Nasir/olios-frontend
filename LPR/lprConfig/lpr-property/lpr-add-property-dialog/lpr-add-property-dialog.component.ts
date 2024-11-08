import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { PropertyService } from 'src/app/services/property.service';
import { LookupService } from 'src/app/services/lookup.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: 'app-lpr-add-property-dialog',
  templateUrl: './lpr-add-property-dialog.component.html',
  styleUrls: ['./lpr-add-property-dialog.component.scss']
})
export class LprAddPropertyDialogComponent implements OnInit {

  public form: any;
  public orgId: number;
  public adminRole: any;
  public organizationList = [];

  constructor(public dialogRef: MatDialogRef<LprAddPropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public propertyService: PropertyService,
    public organizationService: OrganizationService,
    public tokenStorage: TokenStorage,
    public authenticationService: AuthenticationService,
    public toastrService: ToastrService
  ) {
    this.initlizeGeofenceAddForm();
  }

  ngOnInit() {
    this.adminRole = this.authenticationService.currentUserValue.role;
    this.orgId = this.authenticationService.currentUserValue.organizationId;
  }

  initlizeGeofenceAddForm() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      organizationId: new FormControl(""),
      address: new FormControl("", Validators.required),
      contact: new FormControl("", Validators.required),
      latitude: new FormControl(0, Validators.required),
      longitude: new FormControl(0, Validators.required),
    });
    if(this.adminRole != "ROLE_SUPER_ADMIN"){
      this.form.get('organizationId').setValue(this.orgId);
    }
  }

  getAllOrganization() {
    this.organizationService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data.length > WebConstants.INT_ZERO) {
            this.organizationList = response.data;
          }
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!")
        }
      });
  }

  addPropertyData() {
    //console.log("add Property data ",this.form.getRawValue() );
    let data = this.form.getRawValue()
    this.propertyService.addProperty(data)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Property Added Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Add Data!")
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
