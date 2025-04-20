import { AuditBaseEntity } from './auditBaseEntity';

export class QualityControl extends AuditBaseEntity {
  orderId: number = 0;
  result: string = '';
  shift: string = '';
}
