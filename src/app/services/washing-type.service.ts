import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { WashingType } from '../models/washingType';

@Injectable({
  providedIn: 'root',
})
export class WashingTypeService {
  apiUrl = 'https://localhost:44372/api/WashingTypes/';

  constructor(private httpClient: HttpClient) {}

  getWashingTypes(): Observable<ResponseListDataModel<WashingType>> {
    return this.httpClient.get<ResponseListDataModel<WashingType>>(
      this.apiUrl + 'getall'
    );
  }
}
