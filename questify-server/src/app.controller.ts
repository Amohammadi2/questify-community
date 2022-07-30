import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { User } from './user-social/user-social.schemas';
import * as bcrypt from "bcrypt";
import { Question, QuestionDocument } from './qa/qa.schema';

@Controller()
export class AppController {
  
}
