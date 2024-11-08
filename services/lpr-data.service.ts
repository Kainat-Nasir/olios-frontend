import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LprDataService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper,
    private httpClient: HttpClient) {
  }

  searchLprViolation(): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR.FIND_PAST_ACTIONS
    return this.ajaxHelper.get(url);
  }

  searchLprViolationImageDetail(payloadid: any): Observable<BaseResponse<any>> {
    // let url = this.baseUrl + WebConstants.API_URL.LPR.FIND_VIOLATION_IMAGE_DETAILS + imageData;
    let url = this.baseUrl + WebConstants.API_URL.LPR_RAW.FIND_RAW_DATA_IMAGE_BY_SESSION_ID + payloadid;

    return this.ajaxHelper.get(url);
  }

  LprShiftData(payload: Object): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.SHIFT_DATA.FIND_ALL
    //return this.ajaxHelper.get(url);
    let date = {
      "sessionStartString":"2021-12-01 00:00:00",
      "sessionEndString":"2021-12-30 23:59:59"
  }

    return this.ajaxHelper.post(url , payload);
  }

  LprShiftRawData(payloadid: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.SHIFT_RAW_DATA.FIND_ALL + payloadid;
    return this.ajaxHelper.get(url);
  }


  ShiftStatsData(payload: Object): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_RAW.FIND_STATS
    return this.ajaxHelper.post(url , payload);
  }

  ShiftStatsDataDaily(payload: Object): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LPR_RAW.FIND_STATS_DAILY
    return this.ajaxHelper.post(url , payload);
  }

}
