import { AreaModel } from './area.model';
import { OrganizationModel } from './organization.model';
import { UserModel } from './user.model';

export class MemberModel
{
  constructor(
    public _id: string,
    public organization: OrganizationModel,
    public area: AreaModel,
    public user: UserModel,
    public created_at: Date,
    public updated_at?: Date,
    public deleted_at?: Date) { }
}