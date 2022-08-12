import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from "src/user-social/database/user";

@Controller('proto')
export class ProtoController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get()
  async runProto() {
    const user = await this.userModel.findOne({ username: 'ashkan' });
    return { role: user.role };
  }
}
