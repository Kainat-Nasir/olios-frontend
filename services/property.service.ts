import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public baseUrl:string = environment.BaseServiceUrl;

  constructor(private ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.LPR_PROPERTY.FIND_ALL);
  }

  addProperty(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.LPR_PROPERTY.ADD_PROPERTY, payload);
  }

  updateProperty(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.LPR_PROPERTY.UPDATE_PROPERTY, payload);
  }

  deletePropertyById(propertyId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.LPR_PROPERTY.DELETE_PROPERTY_BY_ID + propertyId);
  }
  
  findPropertyById(propertyId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.LPR_PROPERTY.FIND_PROPERTY_BY_ID + propertyId);
  }
}
