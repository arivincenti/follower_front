import { UserModel } from '../user.model';
import { OrganizationModel } from '../organization.model';

export interface DialogDataOrganization {
  organization: OrganizationModel;
  user: UserModel
}