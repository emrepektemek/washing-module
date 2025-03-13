import { AuditBaseEntity } from './auditBaseEntity';

export class UserOrderReportModel extends AuditBaseEntity {
  productName: string = '';

  quantity: number = 0;

  unitPrice: number = 0;

  orderDate: Date = new Date();

  shipDate: Date = new Date();

  isApproved: boolean | null = true;
}
