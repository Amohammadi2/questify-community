import { Module } from "@nestjs/common";
import { IHashService } from "src/domain/integrations/hash.service.integration";
import { HashService } from "./hash.service";

const HashServiceProvider = {
  provide: IHashService,
  useFactory: () => new HashService()
}

@Module({
  providers: [HashServiceProvider],
  exports: [HashServiceProvider]
})
export class HashModule {}