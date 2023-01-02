import { Module } from "@nestjs/common";
import { ProfileModule } from "./profile/profile.module";
import { SchoolModule } from "./school/school.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    SchoolModule,
    ProfileModule
  ],
  exports: [
    UserModule,
    SchoolModule,
    ProfileModule
  ]
})
export class DatabaseModule {}