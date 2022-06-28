import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Neo4jModule } from "nest-neo4j"
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/domain/auth.service';
import { AuthModule } from './auth/auth.module';
import { QuestionService } from './question/domain/question.service';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'admin'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    UserModule,
    AuthModule,
    QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, QuestionService],
})
export class AppModule {}
