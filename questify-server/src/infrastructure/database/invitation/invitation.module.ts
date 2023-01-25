import { Module } from "@nestjs/common";
import { Neo4jModule } from "nest-neo4j/dist";
import { InvitationRepository } from "src/domain/entities/invitation/invitation.repository";
import { DBUtilsModule } from "../utils/dbutils.module";
import { InvitationNeo4jMapper } from "./invitation.neo4j.mapper";
import { InvitationNeo4jRepository } from "./invitation.neo4j.repository";

const InvRepo = {
  provide: InvitationRepository,
  useClass: InvitationNeo4jRepository
}

@Module({
  imports: [Neo4jModule, DBUtilsModule],
  providers: [InvRepo, InvitationNeo4jMapper],
  exports: [InvRepo, InvitationNeo4jMapper]
})
export class InvitationModule {}