import { UserModel } from "./user.model";

export class NotificationModel {
  constructor(
    public _id: string,
    public notification: string,
    public object: any,
    public objectType: string,
    public users: UserModel[],
    public readed_by: UserModel[],
    public created_at?: Date
  ) {}
}
