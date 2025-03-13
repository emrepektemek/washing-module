import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { ResponseSingleDataModel } from '../models/responseSingleDataModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { UserOperationClaimModel } from './../models/userOperationClaimModel';
import { UserOperationAssignmentUpdateModel } from './../models/userOperationAssignmentUpdateModel';
import { UserOperationAssignmentDeleteModel } from '../models/userOperationAssignmentDeleteModel';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  apiUrl = 'https://localhost:44372/api/UserOperationClaims/';

  constructor(private httpClient: HttpClient) {}

  update(userOperationClaimModel: UserOperationAssignmentDeleteModel) {
    return this.httpClient.post<
      ResponseSingleDataModel<UserOperationAssignmentUpdateModel>
    >(this.apiUrl + 'update', userOperationClaimModel);
  }

  delete(userOperationClaimModel: UserOperationAssignmentDeleteModel) {
    return this.httpClient.post<
      ResponseSingleDataModel<UserOperationAssignmentUpdateModel>
    >(this.apiUrl + 'delete', userOperationClaimModel);
  }
}
