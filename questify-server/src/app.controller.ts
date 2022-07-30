import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { User } from './user-social/user.schema';
import * as bcrypt from "bcrypt";
import { Question, QuestionDocument } from './qa/qa.schema';

@Controller()
export class AppController {
  
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {}
  
  @Get('porto')
  async createFistUser() {


    const question = await this.questionModel.create({
      title: "The second question ever",
      content: "The second question content ever",
      tags: [
        { name: "sys-intro" },
        { name: "first-ever"}
      ],
      author: (await this.userModel.findOne({ username: 'ashkan' })).id
    })

    console.log(question);

    return { hello : "ASHKAN" }
  }
}
