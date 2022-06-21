import { BaseCase, Case } from "../cases.model";
import { BaseChangeLog, ChangeLog } from "../change-logging/change-log.model";

export interface CaseChange {
  case: Case | BaseCase;
  changeLog: ChangeLog | BaseChangeLog;
}
