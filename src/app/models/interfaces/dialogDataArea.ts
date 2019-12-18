import { OrganizationModel } from '../organization.model';
import { UserModel } from '../user.model';

export interface DialogDataArea{
  user: UserModel,
  organization: OrganizationModel,
  area: string;
}