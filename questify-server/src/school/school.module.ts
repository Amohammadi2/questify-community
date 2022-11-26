import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { entities } from './school.entities';

const mongooseModule = MongooseModule.forFeature(entities);

@Module({
  imports: [mongooseModule]
})
export class SchoolModule {}
