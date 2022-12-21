import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from 'nest-neo4j'
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { GuardsModule } from './graphql/guards/guards.module';
import { RegistrationModule } from './registration/registration.module';

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
    AuthModule,
    GuardsModule,
    RegistrationModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
