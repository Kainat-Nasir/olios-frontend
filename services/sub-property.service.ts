import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';

@Injectable({
  providedIn: 'root'
})
export class SubPropertyService {

  public baseUrl:string = environment.BaseServiceUrl;

  constructor(private ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.LPR_SUB_PROPERTY.FIND_ALL);
  }

  addSubProperty(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.LPR_SUB_PROPERTY.ADD_SUB_PROPERTY, payload);
  }

  updateSubProperty(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.LPR_SUB_PROPERTY.UPDATE_SUB_PROPERTY, payload);
  }

  deleteSubPropertyById(subPropertyId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.LPR_SUB_PROPERTY.DELETE_SUB_PROPERTY_BY_ID + subPropertyId);
  }
  
  findSubPropertyById(subPropertyId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.LPR_SUB_PROPERTY.FIND_SUB_PROPERTY_BY_ID + subPropertyId);
  }

  findSubPropertyByPropertyId(propertyId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.LPR_SUB_PROPERTY.FIND_ALL_BY_PROPERTY_ID + propertyId);
  }
}
