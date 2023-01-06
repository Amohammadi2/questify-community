import { Module } from "@nestjs/common";
import { ProfileModule } from "./profile/profile.module";
import { SchoolModule } from "./school/school.module";
import { TransactionControlModule } from "./transaction-control/transaction-control.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    SchoolModule,
    ProfileModule,
    TransactionControlModule
  ],
  exports: [
    UserModule,
    SchoolModule,
    ProfileModule,
    TransactionControlModule
  ]
})
export class DatabaseModule {}