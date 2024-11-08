import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { PropertyService } from 'src/app/services/property.service';
import { OrganizationService } from 'src/app/services/organization.service';


@Component({
  selector: 'app-lpr-property-update-dialog',
  templateUrl: './lpr-property-update-dialog.component.html',
  styleUrls: ['./lpr-property-update-dialog.component.scss']
})
export class LprPropertyUpdateDialogComponent implements OnInit {

  public form: any;
  public organizationList = [];

  constructor(
    public dialogRef: MatDialogRef<LprPropertyUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public propertyService: PropertyService,
    public organizationService: OrganizationService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) {
    this.initlizePropertyUpdateForm();
  }

  ngOnInit() { }  

  initlizePropertyUpdateForm() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      organizationId: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      contact: new FormControl("", Validators.required),
      latitude: new FormControl(0, Validators.required),
      longitude: new FormControl(0, Validators.required),
    });

    this.form.get('name').setValue(this.data.name);
    this.form.get('organizationId').setValue(this.data.organizationId);
    this.form.get('address').setValue(this.data.address);
    this.form.get('contact').setValue(this.data.contact);
    this.form.get('latitude').setValue(this.data.latitude);
    this.form.get('longitude').setValue(this.data.longitude);
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

  updatePropertyData() {
    //console.log("update Property data ",this.form.getRawValue() );
    let updatedData = this.form.getRawValue()
    updatedData.id = this.data.id;
    this.propertyService.updateProperty(updatedData)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Property Updated Successfully!");
          this.dialogRef.close();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!")
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
