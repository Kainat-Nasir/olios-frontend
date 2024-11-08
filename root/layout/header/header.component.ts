import { Component, OnInit } from "@angular/core";
import { TokenStorage } from "src/app/util/token.storage";
import { WebConstants } from "src/app/util/web.constants";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthenticationService } from "src/app/services/authentication.service";
import {RoleMenu} from "src/app/util/role.menu";
import { DomSanitizer } from '@angular/platform-browser';
import { OrganizationService } from 'src/app/services/organization.service';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  public parentMenuList: any = [];
  public loggedInUser: any = {};
  public userName: any = [];
  public orgLogo: any;
  public isImage: boolean = false;
  public orgName: any;
  public organization: any;
  public title: string = WebConstants.MENU_NAMES.PROJECT_NAME;
  public searchQuery: string = '';

  constructor(public tokenStorage: TokenStorage,
    public router: Router,
    public location: Location,
    private sanitizer:DomSanitizer,
    public organizationService: OrganizationService,
    public authenticationService: AuthenticationService) {
      this.getOrganizationDetailById();
    this.loggedInUser = this.tokenStorage.getUser();
  }

  ngOnInit(): void {
    this.updateMenu();
    this.userName = this.authenticationService.currentUserValue;
    this.getOrganizationDetailById();
    ////console.log("MenuList ", this.menuList);
    $(document).ready(function () {
      $("#menu-btn").click(function () {
        $("#menu").toggle();
        $("#menu").addClass("sh");
      });


      $("#menu a").click(function () {
        $(".sh").hide();
      });
    });
  }

  getOrganizationDetailById(){
    this.organizationService.getOrganizationDetailById(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.organization = response.data;
          this.orgName = this.organization.name;
          if(this.organization.status === 1 && this.organization.logo){
            this.orgLogo = this.organization.logo;
            this.isImage = true;
          }
        }
      });
  }

  getLogo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.orgLogo);
  }

  signout(): void {
    this.authenticationService.logout();
    //this.tokenStorage.clearAll();
    this.router.navigate([WebConstants.WEB_URL.HOME]);
  }

  userProfile(): void {
    this.router.navigate([WebConstants.WEB_URL.USER_PROFILE]);
  }

  updateMenu(): void {
    // if (this.tokenStorage.getMenuList().length > 0) {
    //   this.parentMenuList = this.tokenStorage.getMenuList();
    // }
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser.role == "ROLE_SUPER_ADMIN"){
      this.parentMenuList = RoleMenu[0].ROLE_SUPER_ADMIN;
    }
    else if(currentUser.role == "ROLE_ADMIN_ORGANIZATION"){
      this.parentMenuList = RoleMenu[0].ROLE_ADMIN_ORGANIZATION;
    }
    else if(currentUser.role == "ROLE_MANAGER"){
      this.parentMenuList = RoleMenu[0].ROLE_MANAGER.filter(x=>x.id != "8");
    }
    else if(currentUser.role == "ROLE_SUPERVISOR"){
      this.parentMenuList = RoleMenu[0].ROLE_SUPERVISOR.filter(x=>x.id != "8");
    }
    else if(currentUser.role == "ROLE_PATROLLING_OFFICER"){
      this.parentMenuList = RoleMenu[0].ROLE_PATROLLING_OFFICER.filter(x=>x.id != "8");
    }
  }

  filteredMenuList() {
    return this.parentMenuList.filter(menu =>
      menu.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
