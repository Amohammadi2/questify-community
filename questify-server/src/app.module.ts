import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from 'nest-neo4j'
import { DomainModule } from './app/injection/domain.module';
import { AppGraphqlModule } from './app/graphql/app-graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema.graphql',
    }),
    Neo4jModule.forRoot({
      username: 'neo4j',
      password: 'ashkansiteadmin',
      host: 'localhost',
      port: '7687',
      scheme: 'bolt'
    }),
    DomainModule,
    AppGraphqlModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
