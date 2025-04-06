import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { WashList } from '../models/washListModel';
import { Wash } from '../models/wash';
import { ResponseModel } from '../models/responseModel';
import { WashCreateModel } from '../models/washCreateModel';

@Injectable({
  providedIn: 'root',
})
export class WashService {
  apiUrl = 'https://localhost:44372/api/Wash/';

  constructor(private httpClient: HttpClient) {}

  getAllForWashing(): Observable<ResponseListDataModel<WashList>> {
    return this.httpClient.get<ResponseListDataModel<WashList>>(
      this.apiUrl + 'getallforwashing'
    );
  }

  add(wash: WashCreateModel) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', wash);
  }
}
