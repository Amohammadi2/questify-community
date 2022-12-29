import { Module } from "@nestjs/common";
import { Neo4jModule } from "nest-neo4j/dist";
import { UserRepository } from "src/domain/entities/user/user.repository";
import { HashModule } from "src/infrastructure/hash/hash.module";
import { UserNeo4jMapper } from "./user.neo4j.mapper";
import { UserNeo4jRepository } from "./user.neo4j.repository";

@Module({
  imports: [HashModule, Neo4jModule],
  providers: [
    UserNeo4jMapper,
    {
      provide: UserRepository,
      useClass: UserNeo4jRepository
    }
  ],
  exports: [UserNeo4jMapper, {
    provide: UserRepository,
    useClass: UserNeo4jRepository
  }]
})
export class UserModule {}