import { UserModel } from './user.model';
import { OrganizationModel } from './organization.model';

export class AreaModel
{
  constructor(
    public _id: string,
    public name: string,
    public organization: OrganizationModel,
    public members: UserModel[],
    public responsible?: UserModel,
    public created_by?: UserModel,
    public updated_by?: UserModel,
    public deleted_by?: UserModel,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date
  ) { }
}