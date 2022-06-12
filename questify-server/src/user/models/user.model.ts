import { getPasswordHash } from "src/utils/get-password-hash";
import { getUID } from "src/utils/get-uid";
import { Optional } from "src/utils/make-optional";

export interface IUserModel {
  id: string;
  username: string;
  email: string;
  password: string;
}

export class UserModel implements IUserModel {

  public id: string;
  public username: string;
  public email: string;
  public password: string;

  constructor(props: IUserModel) {
    Object.assign(this, props);
  }

  public static New({ username, email, password=null }: Optional<Omit<IUserModel, "id">, "password">) {
    return new UserModel({
      id: getUID(),
      username: username,
      email: email,
      password: getPasswordHash(password),
    });
  }
  

  public setPassword(newPassword: string) {
    this.password = getPasswordHash(newPassword);
  }
}
