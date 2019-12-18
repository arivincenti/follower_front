import { OrganizationModel } from '../organization.model';
import { UserModel } from '../user.model';

export interface DialogDataMember {
  user: UserModel,
  organization: OrganizationModel;
}