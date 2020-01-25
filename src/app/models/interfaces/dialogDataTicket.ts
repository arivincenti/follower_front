import { UserModel } from '../user.model';
import { OrganizationModel } from '../organization.model';

export interface DialogDataTicket {
  organization: OrganizationModel;
  user: UserModel
}