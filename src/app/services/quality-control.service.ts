import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { QualityControl } from '../models/qualityControl';

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
}
