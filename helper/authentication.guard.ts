import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterOutlet } from '@angular/router';
import { TokenStorage } from "src/app/util/token.storage";

import { AuthenticationService } from '../services/authentication.service';
import { WebConstants } from '../util/web.constants';

/**
 * @author Riaz Jaffary
 */

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  public parentMenuList: any = [];
  public loggedInUser: any = {};
  public ismenu: boolean;
  constructor(public router: Router,
    public tokenStorage: TokenStorage,
    public authenticationService: AuthenticationService) {
      
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    const currentToken = this.authenticationService.tokenStorage;

    ////console.log("currentUser={}, url={}", currentUser, state.url);
      //console.log(currentUser.menu[0].menuList[0].name);


      let menuLength= currentUser.menu[0].menuList.length;
      for(let i=0;i<menuLength;i++){
        if(currentUser.menu[0].menuList[i].name == route.data.role){
          this.ismenu=true;
          break;
        }
        else{
          this.ismenu=false;           
        }
       
      }
      // // authorised so return true      
      // if(!ismenu){
      //   window.location.href = '#/access-denied';
      // }

      // if(currentUser.role != "ROLE_SUPER_ADMIN"){
      //   console.log(route.data.role);
      //   window.location.href = '#/access-denied';
      // }

    if(this.ismenu && currentUser){
      return true;
    }
    else if(!this.ismenu && currentUser){
      this.router.navigate(["access-denied"]);
    }
    else{
      this.UserCredentialsError(state);  
      return false;
    }

    // not logged in so redirect to login page with the return url
  }

  UserCredentialsError(state){
    this.authenticationService.logout();
    this.router.navigate([WebConstants.WEB_URL.LOGIN]);
  }
}
