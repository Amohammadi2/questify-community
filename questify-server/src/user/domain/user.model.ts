import { getPasswordHash } from "src/utils/get-password-hash";
import { getUID } from "src/utils/get-uid";

export enum UserRole {
  STUDENT, TEACHER, MANAGER
}

interface IUserModel {
  id: string;
  username: string;
  password: string;
  bio?: string;
  role: UserRole
  profileImageUrl?: string;
}

export class UserModel implements IUserModel {
  public id: string;
  public username: string;
  public password: string;
  public bio: string;
  public profileImageUrl: string;
  public role: UserRole;
  

  constructor(props: IUserModel) {
    Object.assign(this, props);
  }

  public static init({
    username, password, bio=null, profileImageUrl=null, role=UserRole.STUDENT
  }: Omit<IUserModel, 'id'>) {
    return new UserModel({
      id: getUID(),
      username,
      password: getPasswordHash(password),
      bio,
      profileImageUrl,
      role
    })
  }
}