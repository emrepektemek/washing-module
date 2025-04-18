import { AuditBaseEntity } from './auditBaseEntity';

export class Machine extends AuditBaseEntity {
  machineName: string = '';
  machineType: string = '';
}
