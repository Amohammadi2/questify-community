import { Module } from "@nestjs/common";
import { Neo4jDateTimeMapper } from "./neo4j-date";

@Module({
  providers: [Neo4jDateTimeMapper],
  exports: [Neo4jDateTimeMapper]
})
export class DBUtilsModule {}