import { Module, Global } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure/database/database.module";
import { AppJwtModule } from "src/infrastructure/jwt/jwt.module";


@Global()
@Module({
  imports: [
    AppJwtModule,
    DatabaseModule
  ],
  providers: [

  ],
  exports: [DatabaseModule],
})
export class DomainModule {}