import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/base.response';
import { AjaxHelper } from '../helper/ajax.helper';
import { environment } from 'src/environments/environment';
import { WebConstants } from '../util/web.constants';

/**
 * @author Kainat Nasir
 */

@Injectable({ providedIn: 'root' })
export class licenseExpiryService {


  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.license_EXPIRY.FIND_ALL);
  }

  getOrganizationById(Id: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.license_EXPIRY.FIND_ORGANIZATION_BY_ID);
  }

  addlicenseExpiry(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.license_EXPIRY.ADD_license_EXPIRY, payload);
  }

  updatelicenseExpiry(Id: Number, payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.license_EXPIRY.UPDATE_license_EXPIRY + Id, payload);
  }

  deletelicenseExpiry(Id: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.license_EXPIRY.DELETE_license_EXPIRY + Id);
  }
}
  