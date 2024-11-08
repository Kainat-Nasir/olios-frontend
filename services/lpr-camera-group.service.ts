import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';

@Injectable({
  providedIn: 'root'
})
export class LprCameraGroupService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) {
  }

  addLprCameraGroup(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_CAMERA_GROUP.ADD_LPR_CAMERA_GROUP;

    return this.ajaxHelper.post(url , payload);
  }

  updateLprCamerGroup(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_CAMERA_GROUP.UPDATE_LPR_CAMERA_GROUP;

    return this.ajaxHelper.post(url , payload);
  }

  deleteLprCameraGroup(id : number): Observable<BaseResponse<any>> {
    let url = this.baseUrl +WebConstants.API_URL.LPR_CAMERA_GROUP.DELETE_LPR_CAMERA_GROUP + id;

    return this.ajaxHelper.get(url);
  }

  getAllLprCameraGroup(): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_CAMERA_GROUP.FIND_ALL_LPR_CAMERA_GROUP;
    return this.ajaxHelper.get(url);
  }
}
