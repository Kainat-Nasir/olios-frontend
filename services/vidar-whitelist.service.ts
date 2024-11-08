import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';

@Injectable({
  providedIn: 'root'
})
export class VidarWhitelistService {

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) {
  }

  authVidarCamera(): Observable<BaseResponse<any>> {
    let url = "http://192.168.1.233/login.html?p_send=1&p_username=conure&p_passw=Elephant2t2r";
    return this.ajaxHelper.get(url);
  }

  addVidarWhiteList(payload : any): Observable<BaseResponse<any>> {
    let url = "http://"+payload.cameraIp+"/lpr/cff?sql=INSERT%20INTO%20vehicles%20VALUES("+payload.ruleId+","+payload.numberPlate+");&cmd=querydb";

    return this.ajaxHelper.post(url , payload);
  }

  updateVidarWhiteList(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_WHITELIST.UPDATE_LPR_WHITELIST;

    return this.ajaxHelper.post(url , payload);
  }

  addBulkVidarWhiteList(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_WHITELIST.ADD_MULTIPLE_LPR_WHITELIST;

    return this.ajaxHelper.post(url , payload);
  }

  deleteVidarWhiteList(id : number): Observable<BaseResponse<any>> {
    let url = this.baseUrl +WebConstants.API_URL.LPR_WHITELIST.DELETE_LPR_WHITELIST + id;

    return this.ajaxHelper.get(url);
  }

  deleteAllVidarWhitelist(): Observable<BaseResponse<any>> {
    let url = this.baseUrl +WebConstants.API_URL.LPR_WHITELIST.DELETE_ALL_REGISTERED_VEHICLE;

    return this.ajaxHelper.get(url);
  }

  getAllVidarWhiteList(): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_WHITELIST.FIND_ALL_LPR_WHITELIST;
    return this.ajaxHelper.get(url);
  }
}
