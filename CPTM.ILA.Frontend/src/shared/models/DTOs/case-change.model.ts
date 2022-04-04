import { Case } from "../cases.model";
import { ChangeLog } from "./../change-logging/change-log.model";

export interface CaseChange {
  case: Case;
  changeLog: ChangeLog;
}
