import { Module } from "@nestjs/common";
import { Neo4jModule } from "nest-neo4j/dist";
import { ProfileRepository } from "src/domain/entities/profile/profile.repository";
import { ProfileNeo4jMapper } from "./profile.neo4j.mapper";
import { ProfileNeo4jRepository } from "./profile.neo4j.repository";

const ProfileRepo = {
  provide: ProfileRepository,
  useClass: ProfileNeo4jRepository
}

@Module({
  imports: [
    Neo4jModule
  ],
  providers: [ProfileRepo, ProfileNeo4jMapper],
  exports: [ProfileRepo, ProfileNeo4jMapper]
})
export class ProfileModule {}