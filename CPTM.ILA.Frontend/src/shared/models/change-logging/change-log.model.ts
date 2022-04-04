import { User } from "../access-control/users.model";
import { Case } from "../cases.model";
import { ItemIdentity } from "../messaging/item-identity.model";

export interface ChangeLog {
  user: User;
  case: Case;
  changeDate: Date;
  items: ItemIdentity[];
}
