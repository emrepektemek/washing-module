import { AuditBaseEntity } from './auditBaseEntity';

export class PantFabricModel extends AuditBaseEntity {
  fabricId: number = 0;
  fabricMaterials: string = '';
  modelName: string = '';
}
