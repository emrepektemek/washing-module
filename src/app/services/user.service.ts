import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseListDataModel } from '../models/responseListDataModel';
import { UserOperationAssignmentModel } from '../models/userOperationAssignmentModel';
import { UserForCustomerModel } from '../models/userForCustomerModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44372/api/Users/';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ResponseListDataModel<UserOperationAssignmentModel>> {
    return this.httpClient.get<
      ResponseListDataModel<UserOperationAssignmentModel>
    >(this.apiUrl + 'getusers');
  }
}
