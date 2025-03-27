import { AuditBaseEntity } from './auditBaseEntity';

export class Wash extends AuditBaseEntity {
  orderId: number = 0;
  washingTypeId: number = 0;
  shift: string = '';
}
