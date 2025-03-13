import { ResponseModel } from './responseModel';

export class ResponseSingleDataModel<T> extends ResponseModel {
  data: T;
}
