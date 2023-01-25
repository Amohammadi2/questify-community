import { Module, Global } from "@nestjs/common";
import { InvitationService, UserManagementService } from "src/domain/services";
import { DatabaseModule } from "src/infrastructure/database/database.module";
import { AppTransactionManager } from "src/infrastructure/database";
import { AppJwtModule } from "src/infrastructure/jwt/jwt.module";
import { IHashService } from "src/domain/integrations/hash.service.integration";
import { UserRepository } from "src/domain/entities/user/user.repository";
import { ProfileRepository } from "src/domain/entities/profile/profile.repository";
import { SchoolRepository } from "src/domain/entities/school/school.repository";
import { HashModule } from "src/infrastructure/hash/hash.module";
import { InvitationRepository } from "src/domain/entities/invitation/invitation.repository";


const UserManagementServiceProvider = {
  provide: UserManagementService,
  inject: [AppTransactionManager, IHashService, UserRepository, ProfileRepository, SchoolRepository],
  useFactory: (
    tm: AppTransactionManager,
    hash: IHashService,
    urepo: UserRepository,
    prepo: ProfileRepository,
    srepo: SchoolRepository
  ) => new UserManagementService(tm, hash, urepo, prepo, srepo)
}

const InvitationServiceProvider = {
  provide: InvitationService,
  inject: [InvitationRepository, SchoolRepository, UserRepository],
  useFactory: (
    iRepo: InvitationRepository,
    sRepo: SchoolRepository,
    uRepo: UserRepository
  ) => new InvitationService(iRepo, sRepo, uRepo)
}

@Global()
@Module({
  imports: [
    AppJwtModule,
    DatabaseModule,
    HashModule
  ],
  providers: [
    UserManagementServiceProvider,
    InvitationServiceProvider
  ],
  exports: [DatabaseModule, UserManagementServiceProvider, InvitationServiceProvider],
})
export class DomainModule {}