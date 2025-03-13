import { AuditBaseEntity } from './auditBaseEntity';

export class Warehouse extends AuditBaseEntity {
  warehouseName: string = '';
  location: string = '';
  capacity: number = 0;
}
