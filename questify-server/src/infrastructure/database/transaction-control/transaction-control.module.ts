import { Module } from "@nestjs/common";
import { Neo4jModule } from "nest-neo4j/dist";
import { AppTransactionManager } from "./app-transaction-manager.service";

@Module({
  imports: [Neo4jModule],
  providers: [AppTransactionManager],
  exports: [AppTransactionManager]
})
export class TransactionControlModule {}