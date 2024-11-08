import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.FIND_ALL_ORGANIZATION);
  }

  addOrganization(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.ORGANIZATION.ADD_ORGANIZATION, payload);
  }

  updateOrganization(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.ORGANIZATION.UPDATE_ORGANIZATION, payload);
  }

  deleteOrganization(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.DELETE_ORGANIZATION + organizationId);
  }

  deactivateOrganization(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.ORGANIZATION.DEACTIVATE_ORGANIZATION + organizationId,{});
  }
  
  activateOrganization(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl +  WebConstants.API_URL.ORGANIZATION.ACTIVATE_ORGANIZATION + organizationId,{});
  }
  

  getOrganizationById(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.FIND_ORGANIZATION_BY_ID + organizationId);
  }

  getOrganizationDetailById(organizationId: Number): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.FIND_ORGANIZATION_DETAIL_BY_ID + organizationId);
  }

  getOrganizationDetail(organizationId: Number): Observable<BaseResponse<any>> {

    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.FIND_DETAIL  + organizationId);
  }
}
