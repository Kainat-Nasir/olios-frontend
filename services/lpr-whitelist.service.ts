import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';

@Injectable({
  providedIn: 'root'
})
export class LprWhitelistService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) {
  }

  addLprWhiteList(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_WHITELIST.ADD_LPR_WHITELIST;

    return this.ajaxHelper.post(url , payload);
  }

  updateLprWhiteList(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_WHITELIST.UPDATE_LPR_WHITELIST;

    return this.ajaxHelper.post(url , payload);
  }

  addMultipleLprWhiteList(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_WHITELIST.ADD_MULTIPLE_LPR_WHITELIST;

    return this.ajaxHelper.post(url , payload);
  }

  deleteLprWhiteList(id : number): Observable<BaseResponse<any>> {
    let url = this.baseUrl +WebConstants.API_URL.LPR_WHITELIST.DELETE_LPR_WHITELIST + id;

    return this.ajaxHelper.get(url);
  }

  deleteAllRegisteredVehicle(): Observable<BaseResponse<any>> {
    let url = this.baseUrl +WebConstants.API_URL.LPR_WHITELIST.DELETE_ALL_REGISTERED_VEHICLE;

    return this.ajaxHelper.get(url);
  }

  getAllLprWhiteList(): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_WHITELIST.FIND_ALL_LPR_WHITELIST;
    return this.ajaxHelper.get(url);
  }
}
