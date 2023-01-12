export interface IRole {
  role: 'STUDENT' | 'MANAGER' |'TEACHER',
  schoolName: string;
  schoolId: string;
}

export interface IAccount {
  id: string;
  username: string;
  schoolRoles: IRole[];
}