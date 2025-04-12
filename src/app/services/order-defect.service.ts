import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { OrderDefectWithDefectAndOrderModel } from '../models/orderDefectWithDefectAndOrderModel';

@Injectable({
  providedIn: 'root',
})
export class OrderDefectService {
  apiUrl = 'https://localhost:44372/api/OrderDefects/';

  constructor(private httpClient: HttpClient) {}

  getOrderDefects(): Observable<
    ResponseListDataModel<OrderDefectWithDefectAndOrderModel>
  > {
    return this.httpClient.get<
      ResponseListDataModel<OrderDefectWithDefectAndOrderModel>
    >(this.apiUrl + 'getallwithdefectname');
  }
}
