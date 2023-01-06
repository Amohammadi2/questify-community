import { InternalServerErrorException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserManagementService } from "src/domain/services";
import { RegistrationRequestInput } from "../models/inputs/registration-request.input";

@Resolver()
export class UserManagementResolver {

  constructor(
    private readonly userMg: UserManagementService
  ) {}

  @Mutation(()=>Boolean)
  async requestRegistration(@Args('input') input: RegistrationRequestInput) {
    try {
      await this.userMg.requestRegistration({
        credentials: input.userInfo,
        managerInfo: input.managerInfo,
        schoolInfo: input.schoolInfo
      })
      return true;
    }
    catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }
  
}