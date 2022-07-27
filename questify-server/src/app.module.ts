import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema.graphql'
    }),
    MongooseModule.forRoot(`mongodb://localhost:27017`, {
      auth: {
        username: 'ashkanuser',
        password: 'ashkansiteadmin'
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
