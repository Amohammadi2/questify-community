import { getPasswordHash } from "src/utils/get-password-hash";
import { getUID } from "src/utils/get-uid";

export interface IUserModel {
  id: string;
  username: string;
  password: string;
}

export class UserModel implements IUserModel {

  public id: string;
  public username: string;
  public password: string;

  constructor(props: IUserModel) {
    Object.assign(this, props);
  }

  public static New({ username, password=null }: Omit<IUserModel, "id">) {
    return new UserModel({
      id: getUID(),
      username,
      password: getPasswordHash(password),
    });
  }
  

  public setPassword(newPassword: string) {
    this.password = getPasswordHash(newPassword);
  }
}
