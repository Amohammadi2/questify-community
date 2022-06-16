export type UserRoleNeo4j = "STUDENT" | "TEACHER" | "MANAGER"

interface IUserNeo4j {
  id: string;
  username: string;
  password: string;
  role: UserRoleNeo4j;
  profileImageUrl: string;
  bio: string;
}

export class UserNeo4j implements IUserNeo4j {
  public id: string;
  public username: string;
  public password: string;
  public role: UserRoleNeo4j;
  public profileImageUrl: string;
  public bio: string;
  
  constructor(props: IUserNeo4j) {
    Object.assign(this, props);
  }
}