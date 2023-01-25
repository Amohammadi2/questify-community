import { Module } from "@nestjs/common";
import { InvitationModule } from "./invitation/invitation.module";
import { ProfileModule } from "./profile/profile.module";
import { SchoolModule } from "./school/school.module";
import { TransactionControlModule } from "./transaction-control/transaction-control.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    SchoolModule,
    ProfileModule,
    InvitationModule,
    TransactionControlModule
  ],
  exports: [
    UserModule,
    SchoolModule,
    ProfileModule,
    InvitationModule,
    TransactionControlModule
  ]
})
export class DatabaseModule {}