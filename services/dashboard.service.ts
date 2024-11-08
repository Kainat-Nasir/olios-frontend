import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebConstants } from '../util/web.constants';
import { Observable } from 'rxjs';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(private ajaxHelper: AjaxHelper) { }

  getPeoLastLocation(): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.DASHBOARD.FIND_PEO_LAST_LOCATION
    return this.ajaxHelper.get(url);
  }
}
