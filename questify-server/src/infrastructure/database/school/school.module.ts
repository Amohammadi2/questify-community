import { Module } from "@nestjs/common";
import { Neo4jModule } from "nest-neo4j/dist";
import { SchoolRepository } from "src/domain/entities/school/school.repository";
import { SchoolNeo4jMapper } from "./school.neo4j.mapper";
import { SchoolNeo4jRepository } from "./school.neo4j.repository";

const SchoolRepo = {
  provide: SchoolRepository,
  useClass: SchoolNeo4jRepository
}

@Module({
  imports: [
    Neo4jModule
  ],
  providers: [SchoolRepo, SchoolNeo4jMapper],
  exports: [SchoolRepo, SchoolNeo4jMapper]
})
export class SchoolModule {}