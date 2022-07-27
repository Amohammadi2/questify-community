import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, userSchema } from './user.schema';

const mongooseModule = MongooseModule.forFeature([{ name: UserDocument.name, schema: userSchema }]);

@Module({
  imports: [
    mongooseModule
  ],
  providers: [],
  exports: [mongooseModule],
})
export class UsersModule {}