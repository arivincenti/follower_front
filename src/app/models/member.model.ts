export class MemberModel
{
  constructor(
    public _id: string,
    public organization: string,
    public area: string,
    public user: string,
    public created_at: Date,
    public updated_at?: Date,
    public deleted_at?: Date) { }
}