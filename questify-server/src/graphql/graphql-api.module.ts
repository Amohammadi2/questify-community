import { Module } from "@nestjs/common";
import { authResolvers } from "./auth-graphql";
import { schoolManagementResolvers } from "./school-management-graphql";
import { userScoialResolvers } from "./user-social-graphql";
import { qaResolvers } from "./qa-graphql";
import { CqrsModule } from "@nestjs/cqrs";
import { QaModule } from "src/qa/qa.module";
import { SchoolManagementModule } from "src/school-management/school-management.module";
import { AuthModule } from "src/auth/auth.module";
import { UserSocialModule } from "src/user-social/user-social.module";

@Module({
  imports: [
    CqrsModule,
    QaModule,
    SchoolManagementModule,
    AuthModule,
    UserSocialModule
  ], 
  providers: [
    ...authResolvers,
    ...schoolManagementResolvers,
    ...userScoialResolvers,
    ...qaResolvers
  ]
})
export class GraphQLAPIModule {}