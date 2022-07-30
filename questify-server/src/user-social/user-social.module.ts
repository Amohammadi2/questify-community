import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user-social.schemas';

const mongooseModule = MongooseModule.forFeature([{ name: User.name, schema: userSchema }]);

@Module({
  imports: [
    mongooseModule
  ],
  providers: [],
  exports: [mongooseModule],
})
export class UserSocialModule {}

