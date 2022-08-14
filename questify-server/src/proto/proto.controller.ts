import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAccount, UserAccountDoc } from 'src/auth/database/user-account';


@Controller('proto')
export class ProtoController {
  constructor(@InjectModel(UserAccount.name) private userAccount: Model<UserAccountDoc>) {}

  @Get()
  async runProto() {
    const user = await this.userAccount.findOne({ username: 'ashkan' });
    return {
      isAdmin: user.isAdmin
    };
  }
}
