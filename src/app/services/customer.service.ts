import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { CustomerAddModel } from '../models/customerAddModel';
import { Customer } from '../models/customer';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44372/api/Customers/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ResponseListDataModel<Customer>> {
    return this.httpClient.get<ResponseListDataModel<Customer>>(
      this.apiUrl + 'getall'
    );
  }

  add(customerAddModel: CustomerAddModel) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      customerAddModel
    );
  }
}
