import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-password',
  templateUrl: './add-new-password.component.html',
  styleUrls: ['./add-new-password.component.scss']
})
export class AddNewPasswordComponent implements OnInit {
  public form: FormGroup;
  public resetToken: any;
  public userId: number = 0;
  public isTokenVerified: boolean = false;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    public activatedRoute: ActivatedRoute,
    private titleService:Title) {
      this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.NEW_PASSWORD)
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((querParams) => {
      this.resetToken = querParams['params'].resettoken;
    });

    this.initializeForm();
    this.verifyResetToken(this.resetToken);
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      newPassword: ['', Validators.required],
      retypeNewPassword: ['', Validators.required]
    });
  }

  verifyResetToken(resetToken: string): void {
    this.userService.verifyResetToken(resetToken)
      .pipe(first())
      .subscribe(response => {
        //console.log("response={}", response);

        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.userId = response.data.userId;
        } else {
          this.toastrService.error(response.value, "Error");
        }
      });
  }

  changePassword(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.userId === 0) {
      this.toastrService.error("Error", "Please verify your reset token");
      return;
    }

    let newPassword = this.form.controls.newPassword.value;
    let retypeNewPassword = this.form.controls.retypeNewPassword.value;

    if (newPassword !== retypeNewPassword) {
      this.toastrService.error("New password does not matched with re-entered password", "Password Matching Failed");
      return;
    }

    let formValue = {
      userId: this.userId,
      password: newPassword
    };

    this.userService.resetPassword(formValue)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success("Please Login", "password added successfully");
          this.router.navigate([WebConstants.WEB_URL.LOGIN]);
        } else {
          this.toastrService.error(response.value, "Error");
        }
      });
  }
}
