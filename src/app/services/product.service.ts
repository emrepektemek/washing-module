import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductAddModel } from '../models/productAddModel';
import { ResponseModel } from '../models/responseModel';
import { Product } from '../models/product';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://localhost:44372/api/Products/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ResponseListDataModel<Product>> {
    return this.httpClient.get<ResponseListDataModel<Product>>(
      this.apiUrl + 'getall'
    );
  }

  add(productAddModel: ProductAddModel) {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      productAddModel
    );
  }
}
