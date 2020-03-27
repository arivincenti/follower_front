export class UserModel {
  constructor(
    public _id: string,
    public name: string,
    public last_name: string,
    public genre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date
  ) {}
}
