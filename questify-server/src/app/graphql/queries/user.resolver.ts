import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { SchoolRepository } from "src/domain/entities/school/school.repository";
import { UserRoleObject } from "../models/objects/user-role.object";
import { UserObject } from "../models/objects/user.object";

@Resolver(()=>UserObject)
export class UserResolver {

  constructor(
    private readonly schoolRepo: SchoolRepository
  ) {}

  @ResolveField(()=>[UserRoleObject])
  async schoolRoles(@Parent() { id }: UserObject): Promise<UserRoleObject[]> {
    const result = await this.schoolRepo.getUserRoles(id);
    return result.map(v=>({
      role: v.type,
      schoolId: v.schoolId,
      schoolName: v.schoolName
    }))
  }

}