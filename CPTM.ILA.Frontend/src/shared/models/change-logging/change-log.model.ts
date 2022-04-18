export interface BaseChangeLog {
  userId: number;
  changeDate: Date;
  caseDiff: string;
}

export interface ChangeLog extends BaseChangeLog {
  caseId: number;
}
