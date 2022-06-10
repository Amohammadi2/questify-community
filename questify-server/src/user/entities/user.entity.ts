import { getPasswordHash } from "src/utils/get-password-hash";

export interface IUserEntity {
  username: string;
  password: string;
  email: string;
  uid: string;
}

export class UserEntity implements IUserEntity {

  public username: string;
  public password: string;
  public uid: string;
  public email: string;

  constructor({
    username,
    password,
    email,
    uid
  }: IUserEntity) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.uid = uid;
  }

  public setPassword(password: string) {
    this.password = getPasswordHash(password);
  }
}