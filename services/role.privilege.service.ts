import { Injectable } from '@angular/core';

import { WebConstants } from '../util/web.constants';
import { TokenStorage } from '../util/token.storage';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/base.response';
import { AjaxHelper } from '../helper/ajax.helper';
import { environment } from 'src/environments/environment';

/**
 * @author MSA
 */

@Injectable({ providedIn: 'root' })
export class RolePrivilegeService {
  public baseUrl: string = environment.BaseServiceUrl;
  
  constructor(public tokenStorage: TokenStorage,
    public ajaxHelper: AjaxHelper) {
  }

  getAllRoles(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.FIND_ALL_ROLES);
  }

  getAllPrivileges(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.FIND_ALL_PRIVILEGES);
  }

  getPrivilegesByRoleId(roleId: Number): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.FIND_PRIVILEGE_BY_ID + "/" + roleId;

    return this.ajaxHelper.get(url);
  }

  getMenuByPrivilegeId(privilegeId: Number): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.FIND_MENU_BY_PRIVILEGE_ID + "/" + privilegeId;

    return this.ajaxHelper.get(url);
  }

  addMenu(payload: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.ADD_MENU;

    return this.ajaxHelper.post(url, payload);
  }

  updateMenu(payload: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.UPDATE_MENU;

    return this.ajaxHelper.post(url, payload);
  }

  addRolePrivilege(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.ADD_ROLE_PRIVILEGE, payload);
  }

  updatePrivilege(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.ROLE_PRIVILEGE_MENU.UPDATE_PRIVILEGE, payload);
  }
}