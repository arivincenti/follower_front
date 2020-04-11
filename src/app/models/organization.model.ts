import { UserModel } from "./user.model";

export class OrganizationModel {
  constructor(
    public _id: string,
    public name: string,
    public created_by: UserModel,
    public updated_by?: UserModel,
    public deleted_by?: UserModel,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date
  ) {}
}
