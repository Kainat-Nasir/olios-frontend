import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebConstants } from '../util/web.constants';

/**
 * @author ASIM ALI KHAN
 */

@Injectable({
  providedIn: 'root'
})
export class LprRawDataService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) {}

  LprRawDataService(page: number,size: number): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_RAW.FIND_ALL;
    if(page != null && size != null){
      url = this.baseUrl + WebConstants.API_URL.LPR_RAW.FIND_ALL + "?page="+page+"&size="+size;
    }
    return this.ajaxHelper.get(url);
  }

  LprRawDataFindImageByPayloadId(payloadId: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_RAW.FIND_RAW_DATA_IMAGE_BY_SESSION_ID + payloadId;
    return this.ajaxHelper.get(url);
  }

}