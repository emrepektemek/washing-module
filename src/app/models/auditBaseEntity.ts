export abstract class AuditBaseEntity {
  id: number = 0;
  createdUserId: number = 0;
  createdDate: Date = new Date();
  lastUpdatedUserId: number;
  lastUpdatedDate: Date;
  status: boolean = true;
  isDeleted: boolean = false;
}
