import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolManagementModule } from 'src/school-management/school-management.module';
import { InvitationCode, invitationCodeSchema, User, userSchema } from './user-social.schemas';
import { handlers } from "./commands";
import { resolvers } from './graphql';

const mongooseModule = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
  { name: InvitationCode.name, schema: invitationCodeSchema}
]);

@Module({
  imports: [mongooseModule, CqrsModule, forwardRef(() => SchoolManagementModule)],
  providers: [...resolvers, ...handlers],
  exports: [mongooseModule],
})
export class UserSocialModule {}
