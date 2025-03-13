import { ResponseModel } from './responseModel';

export class ResponseListDataModel<T> extends ResponseModel {
  data: T[] = [];
}
