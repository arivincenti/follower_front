import { UserModel } from './user.model';

export class AreaModel
{
  constructor(
    public name: string,
    public organization: string,
    public members: UserModel[],
    public created_by: UserModel,
    public updated_by?: UserModel,
    public deleted_by?: UserModel,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) { }
}