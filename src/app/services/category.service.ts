import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'https://localhost:44372/api/Category/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ResponseListDataModel<Category>> {
    return this.httpClient.get<ResponseListDataModel<Category>>(
      this.apiUrl + 'getall'
    );
  }
}
