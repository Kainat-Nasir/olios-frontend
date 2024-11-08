import { Component, OnInit } from '@angular/core';
import { WebConstants } from '../../../../util/web.constants';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public form: any;

  constructor(public dialog: MatDialog,
    public userService: UserService,
    public toastrService: ToastrService,
    private titleService:Title) {
      this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.FORGET_PASSWORD)
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      emailAddress: new FormControl("", Validators.compose([Validators.email, Validators.required])),
    });
  }

  sendEmail(): void {
    let data = this.form.getRawValue();

    let forgetPasswordObject = {
      origin: WebConstants.ORIGIN,
      emailAddress: data.emailAddress
    };

    this.userService.forgotPassword(forgetPasswordObject)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success("Click the link in the email", "Email send successfully");
        }
      });
  }
}
