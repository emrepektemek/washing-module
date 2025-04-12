import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { DefectWithCategoryModel } from '../models/defectWithCategoryModel';

@Injectable({
  providedIn: 'root',
})
export class DefectService {
  apiUrl = 'https://localhost:44372/api/Defects/';

  constructor(private httpClient: HttpClient) {}

  getDefects(): Observable<ResponseListDataModel<DefectWithCategoryModel>> {
    return this.httpClient.get<ResponseListDataModel<DefectWithCategoryModel>>(
      this.apiUrl + 'getallwhitcategory'
    );
  }
}
