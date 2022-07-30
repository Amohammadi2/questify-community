import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserSocialModule } from './user-social/user-social.module';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from '@nestjs/mongoose';
import { QaModule } from './qa/qa.module';
import { AppResolver } from './app.resolver';
import { SchoolManagementModule } from './school-management/school-management.module';

@Module({
  imports: [
    AuthModule,
    QaModule,
    UserSocialModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema.graphql'
    }),
    MongooseModule.forRoot(`mongodb://localhost:27017/questify`),
    SchoolManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
