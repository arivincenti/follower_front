import { OrganizationModel } from '../organization.model';
import { UserModel } from '../user.model';
import { AreaModel } from '../area.model';

export interface DialogDataArea
{
  user: UserModel,
  organization: OrganizationModel,
  area: AreaModel;
}