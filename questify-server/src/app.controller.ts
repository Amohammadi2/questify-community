import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { User } from './user-social/user.schema';
import * as bcrypt from "bcrypt";

@Controller()
export class AppController {
  
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}
  
  @Get('createFirstUser')
  async createFistUser() {
    const user = await this.userModel.create({
      'username': 'ashkan',
      'password': await bcrypt.hash('siteadmin', await bcrypt.genSalt())
    });
    return {
      'id': user.id
    };
  }
}
