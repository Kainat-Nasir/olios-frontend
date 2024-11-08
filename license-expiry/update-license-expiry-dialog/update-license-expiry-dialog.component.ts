import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { OrganizationService } from 'src/app/services/organization.service';
import { WebConstants } from 'src/app/util/web.constants';
import { licenseExpiryService } from 'src/app/services/license-expiry.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update-license-expiry-dialog',
  templateUrl: './update-license-expiry-dialog.component.html',
  styleUrls: ['./update-license-expiry-dialog.component.scss'],
  providers: [DatePipe] 
})
export class UpdateLicenseExpiryDialogComponent implements OnInit {
  public form: FormGroup;
  public adminRole: string;
  public orgId: Number;

  public statusOptions = [
    { value: 1, label: 'Active' },
    // { value: 2, label: 'Inactive' }
  ];

  constructor(
    public dialogRef: MatDialogRef<UpdateLicenseExpiryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public licenseExpiryService: licenseExpiryService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    public organizationService: OrganizationService,
    private datePipe: DatePipe 
  ) { }

  ngOnInit() {
    this.adminRole = this.tokenStorage.getRole();
    this.orgId = this.tokenStorage.getOrganizationId();
    this.initializeLicenseExpiryForm();
  }

  initializeLicenseExpiryForm(): void {
    this.form = new FormGroup({
      organizationId: new FormControl({ value: this.data.organizationId, disabled: true }, Validators.required),
      expiryDate: new FormControl(this.data.expiryDate, Validators.required),
      status: new FormControl(1, Validators.required) // Set default to "Active"
    });

  

  // Disable the organizationId field so it's not visible or editable by the user
  this.form.get('organizationId').disable();
  }

//   getAllOrganizations() {
//     this.organizationService.getAll()
//       .subscribe(response => {
//         if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
//           this.organizationList = response.data;
//         } else {
//           this.toastrService.error(response.value, "Failed To Load Data!");
//         }
//       });
//   }
//   getOrganizationName(): string {
//     const organization = this.organizationList.find(org => org.id === this.form.get('organizationId').value);
//     return organization ? organization.name : '';
// }

updateLicenseExpiryData(): void {
  let data = this.form.getRawValue();
  data.expiryDate = this.datePipe.transform(data.expiryDate, 'yyyy-MM-dd');

  this.licenseExpiryService.updatelicenseExpiry(this.data.id, data)
    .subscribe(response => {
      if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
        this.toastrService.success(response.value, "License Expiry Updated Successfully!");
        this.dialogRef.close(true);
      } else {
        this.toastrService.error(response.value, "Failed To Update Data!");
      }
    });
}

closeDialog(): void {
  this.dialogRef.close(false);
}
}