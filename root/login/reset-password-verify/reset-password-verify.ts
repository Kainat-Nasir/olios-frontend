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
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';

@Component({
  selector: 'reset-password-verify',
  templateUrl: './reset-password-verify.html',
  styleUrls: ['./reset-password-verify.scss']
})
export class ResetPasswordVerify implements OnInit {

  token: string;
  verification: boolean = false;
  constructor(private route: ActivatedRoute,
    public userService: UserService,
    public toastrService: ToastrService,
    public router: Router) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  verifyResetToken(){
    this.userService.verifyResetToken(this.token)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Your Password has been sent to your email!");
          this.verification = true;
          this.redirectToLogin();
        } else {
          this.toastrService.error(response.value, "Failed To Fetch Data!");
        }
      });
  }

  redirectToLogin(){
    setTimeout(() => {
      this.router.navigate([WebConstants.WEB_URL.LOGIN]);
    }, 3000);
  }

}
