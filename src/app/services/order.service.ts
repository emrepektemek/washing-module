import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { OrderCreateModel } from '../models/orderCreateModel';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { OrderPantModel } from '../models/orderPantModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = 'https://localhost:44372/api/Orders/';

  constructor(private httpClient: HttpClient) {}

  add(orderCreate: OrderCreateModel) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      orderCreate
    );
  }

  getOrdersWithPants(): Observable<ResponseListDataModel<OrderPantModel>> {
    return this.httpClient.get<ResponseListDataModel<OrderPantModel>>(
      this.apiUrl + 'getallwhitpant'
    );
  }
}
