import { User } from "../access-control/users.model";
import { Case } from "../cases.model";

export interface ChangeLog {
  user: User;
  case: Case;
  changeDate: Date;
  items: ItemIdentity[];
}

export interface ItemIdentity {
  identifier: string;
  name: string;
}
