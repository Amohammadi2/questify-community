import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Neo4jModule } from "nest-neo4j"
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MailModule } from './mail/mail.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

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
      autoSchemaFile: false,
      include: [
        UserModule,
      ]
    }),
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
