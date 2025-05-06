import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { QualityControl } from '../models/qualityControl';
import { QualityControlFinalDecisionModel } from '../models/qualityControlFinalDecisionModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class QualityControlService {
  apiUrl = 'https://localhost:44372/api/QualityControls/';

  constructor(private httpClient: HttpClient) {}

  getQualityControls(): Observable<ResponseListDataModel<QualityControl>> {
    return this.httpClient.get<ResponseListDataModel<QualityControl>>(
      this.apiUrl + 'getall'
    );
  }

  update(qualityControlFinalModel: QualityControlFinalDecisionModel) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'update',
      qualityControlFinalModel
    );
  }
}
