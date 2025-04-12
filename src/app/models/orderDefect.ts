import { AuditBaseEntity } from './auditBaseEntity';

export class OrderDefect extends AuditBaseEntity {
  orderId: number = 0;
  defectId: number = 0;
  rowNumber: number = 0;
  decision: string = '';
}
