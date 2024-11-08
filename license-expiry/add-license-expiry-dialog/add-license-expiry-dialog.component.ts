import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { OrganizationService } from 'src/app/services/organization.service';
import { Lookup } from 'src/app/model/lookup';
import { AuthenticationService } from "src/app/services/authentication.service";
import { WebConstants } from 'src/app/util/web.constants';
import { licenseExpiryService } from 'src/app/services/license-expiry.service';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'app-add-license-expiry-dialog',
  templateUrl: './add-license-expiry-dialog.component.html',
  styleUrls: ['./add-license-expiry-dialog.component.scss'],
  providers: [DatePipe] // Add DatePipe as a provider
})
export class AddlicenseExpiryDialogComponent implements OnInit {
  public form: FormGroup;
  public organizationList: Lookup[] = [];
  public adminRole: string;
  public orgId: number;
  
  public statusOptions = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Inactive' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddlicenseExpiryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public licenseExpiryService: licenseExpiryService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    public authenticationService: AuthenticationService,
    public organizationService: OrganizationService,
    private datePipe: DatePipe // Inject DatePipe
  ) { }

  ngOnInit() {
    this.adminRole = this.authenticationService.currentUserValue.role;
    this.orgId = this.authenticationService.currentUserValue.organizationId;
    if (this.adminRole === "ROLE_SUPER_ADMIN") {
      this.getAllOrganizations();
    }
    this.initializeLicenseExpiryForm();
  }

  initializeLicenseExpiryForm(): void {
    this.form = new FormGroup({
      organizationId: new FormControl("", Validators.required),
      expiryDate: new FormControl("", Validators.required),
      status: new FormControl(1, Validators.required) // Defaulting to Active
    });

    if (this.adminRole !== "ROLE_SUPER_ADMIN") {
      this.form.get('organizationId').setValue(this.orgId);
    }
  }

  getAllOrganizations() {
    this.organizationService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data.length > 0) {
            this.organizationList = response.data;
          }
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  addLicenseExpiryData(): void {
    let data = this.form.getRawValue();

    // Format the expiry date to "YYYY-MM-DD"
    data.expiryDate = this.datePipe.transform(data.expiryDate, 'yyyy-MM-dd');

    // console.log(data); 


    this.licenseExpiryService.addlicenseExpiry(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "License Expiry Added Successfully!");
          this.dialogRef.close(true);
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
