import { AreaModel } from './area.model';

export class OrganizationModel
{
  constructor(
    public _id: string,
    public name: string,
    public created_by: string,
    public updated_by?: string,
    public deleted_by?: string,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) { }
}