import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';

@Injectable({
  providedIn: 'root'
})
export class LprCameraService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) {
  }

  addLprCamera(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_CAMERA.ADD_LPR_CAMERA;

    return this.ajaxHelper.post(url , payload);
  }

  updateLprCamera(payload : any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_CAMERA.UPDATE_LPR_CAMERA;

    return this.ajaxHelper.post(url , payload);
  }

  deleteLprCamera(id : number): Observable<BaseResponse<any>> {
    let url = this.baseUrl +WebConstants.API_URL.LPR_CAMERA.DELETE_LPR_CAMERA + id;

    return this.ajaxHelper.get(url);
  }

  getAllLprCamera(): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_CAMERA.FIND_ALL_LPR_CAMERA;
    return this.ajaxHelper.get(url);
  }
}
