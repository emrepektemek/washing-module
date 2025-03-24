import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { OrderCreateModel } from '../models/orderCreateModel';

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
}
