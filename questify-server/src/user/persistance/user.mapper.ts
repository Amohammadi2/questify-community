import { Injectable } from "@nestjs/common";
import { IMapper } from "src/mapper.interface";
import { UserModel } from "../domain/user.model";
import { UserNeo4j, UserRoleNeo4j } from "./user.neo4j.interface";
import { UserRole } from "../domain/user.model";

@Injectable()
export class UserMapper implements IMapper<UserNeo4j, UserModel> {
  
  roleMapping = {
    'STUDENT': UserRole.STUDENT,
    'TEACHER': UserRole.TEACHER,
    'MANAGER': UserRole.MANAGER
  }

  reverseRoleMapping = {
    [UserRole.STUDENT]: 'STUDENT' as UserRoleNeo4j,
    [UserRole.TEACHER]: 'TEACHER' as UserRoleNeo4j,
    [UserRole.MANAGER]: 'MANAGER' as UserRoleNeo4j
  }
  
  toDomainModel({
    id, username, password, role, bio, profileImageUrl
  }: UserNeo4j): UserModel {
    return new UserModel({
      id, username, password, bio, profileImageUrl, role: this.roleMapping[role]
    })
  }
  toNeoModel({
    id, username, password, role, bio, profileImageUrl
  }: UserModel): UserNeo4j {
    return new UserNeo4j({
      id, username, password, bio, profileImageUrl, role: this.reverseRoleMapping[role]
    })
  }
}