import { Injectable } from '@nestjs/common';
import { Mutation, ObjectType, Field, Args, Query, Resolver } from '@nestjs/graphql';
import { UserCredentialsInput } from 'src/auth/auth.resolver';

@ObjectType()
class SchoolRegistrationFormInput {
  @Field() schoolName: string;
  @Field() managerName: string;
  @Field() managerEmail: string;
  @Field() managerPhoneNumber: string;
}

@Resolver()
export class RegistrationResolver {
  // CRUD on schools
  // adding/removing students/teachers
  @Mutation(()=>Boolean)
  async sendRegistrationRequest(@Args('input') input: SchoolRegistrationFormInput) {}

  @Query()
  async registrationRequests() {}

  @Mutation(()=>Boolean)
  async acceptRegistrationRequest(requestId: string, accept:boolean=true) {}
}

@Resolver()
export class MemberInvitationResolver {

  @Mutation(()=>String)
  async generateInvitationCode(invitationType: string) {}

  @Mutation(()=>Boolean)
  async signupWithInvitationCode(
    @Args('code') code: string,
    @Args('credentials') credentials: UserCredentialsInput
  ) {
    // code validation and type determination
    // get the school object
    // create the user entity
    // create the teacher/student object
    // tie the school, teacher and user all together in a chain
  }
}