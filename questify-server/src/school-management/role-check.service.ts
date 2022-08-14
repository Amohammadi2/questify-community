import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from 'src/utils/to-object-id';
import { UserAccountDoc } from "../auth/database/user-account";
import { SchoolMember, SchoolMemberDoc, SchoolMemberRole } from './database/school-member';


@Injectable()
export class RoleCheckService {

  constructor(
    @InjectModel(SchoolMember.name) private readonly schoolMember: Model<SchoolMemberDoc>
  ) {}


  public isManagerOrAdmin(user: UserAccountDoc) {
    return this.isManager(user) || this.isAdmin(user);
  }

  private memberExists(user: UserAccountDoc, role: SchoolMemberRole) {
    return !!this.schoolMember.exists({ account: toObjectId(user.id), role });
  }

  public isManager(user: UserAccountDoc) {
    return this.memberExists(user, 'MANAGER');
  }

  public isStudentOrAdmin(user: UserAccountDoc) {
    return this.isStudent(user) || this.isAdmin(user);
  }

  private isStudent(user: UserAccountDoc) {
    return this.memberExists(user, 'STUDENT');
  }

  public isTeacherOrAdmin(user: UserAccountDoc) {
    return this.isTeacher(user) || this.isAdmin(user);
  }

  public isTeacher(user: UserAccountDoc) {
    return this.memberExists(user, 'TEACHER');
  }

  public isAdmin(user: UserAccountDoc) {
    return user.isAdmin;
  }
}
