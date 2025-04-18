import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { OrderDefectWithDefectAndOrderModel } from '../models/orderDefectWithDefectAndOrderModel';
import { OrderDefectAddModel } from '../models/orderDefectAddModel';
import { ResponseModel } from '../models/responseModel';

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

  add(orderDefectAddModel: OrderDefectAddModel) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      orderDefectAddModel
    );
  }
}
