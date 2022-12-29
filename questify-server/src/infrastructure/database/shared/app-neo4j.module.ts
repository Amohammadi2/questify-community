import { Module } from "@nestjs/common";
import { Neo4jModule } from "nest-neo4j/dist";

@Module({
  imports: [
    Neo4jModule.forRoot({
      username: 'neo4j',
      password: 'ashkansiteadmin',
      host: 'localhost',
      port: '7687',
      scheme: 'bolt'
    })
  ]
})
export class AppNeo4jModule {}