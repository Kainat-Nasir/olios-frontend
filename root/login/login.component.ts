import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/util/token.storage';
import { Router } from '@angular/router';
import { WebConstants } from 'src/app/util/web.constants';
import { first } from 'rxjs/operators';
import { Login } from 'src/app/model/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public forgotform: any;

  constructor(public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public router: Router,
    public tokenStorage: TokenStorage,
    public userService: UserService,
    public toastrService: ToastrService,
    private titleService:Title) {
      this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.LOGIN)
  }

  public year: any = new Date().getFullYear();

  ngOnInit(): void {

    this.initializeForm();

    this.initializeForgotForm();
  }

  ngAfterContentInit(): void{

    if (this.tokenStorage.getToken() !== null) {
      //  this.router.navigate([WebConstants.WEB_URL.LPR_SESSION_DATA]);
      if(this.tokenStorage.getRole() == "ROLE_SUPER_ADMIN"){
        this.router.navigate([WebConstants.WEB_URL.ORGANIZATION]);
      }
      else{
        this.router.navigate([WebConstants.WEB_URL.DASHBOARD]);
      }
    }
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  initializeForgotForm(): void {
    this.forgotform = new FormGroup({
      emailAddress: new FormControl("", Validators.compose([Validators.email, Validators.required])),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    let loginObject = new Login();
    loginObject.origin = WebConstants.ORIGIN;
    loginObject.username = this.loginForm.controls.username.value;
    loginObject.password = this.loginForm.controls.password.value;
    loginObject.origin = WebConstants.ORIGIN;

    this.authenticationService.login(loginObject)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {

          if(this.tokenStorage.getRole() == "ROLE_SUPER_ADMIN"){
            this.router.navigate([WebConstants.WEB_URL.ORGANIZATION]);
          }
          else{
            this.router.navigate([WebConstants.WEB_URL.DASHBOARD]);
          }
          // this.router.navigate([WebConstants.WEB_URL.LPR_SESSION_DATA]);
          // if(this.authenticationService.currentUserValue.role == "ROLE_SUPER_ADMIN"){
          //   this.router.navigate([WebConstants.WEB_URL.ORGANIZATION]);
          // }
          // else{
          //   this.router.navigate([WebConstants.WEB_URL.LPR_SESSION_DATA]);
          // }
        }
      });
  }

  sendEmail(): void {
    let data = this.forgotform.getRawValue();

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

  forgetPassword(): void {
    this.router.navigate([WebConstants.WEB_URL.FORGOT_PASSWORD]);
  }

  forgetUsername(): void {
    this.router.navigate([WebConstants.WEB_URL.FORGOT_USERNAME]);
  }
}
