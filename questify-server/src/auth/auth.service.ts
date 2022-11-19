import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Error, Model } from "mongoose";
import { UserDoc, UserEntity } from "./auth.entities";
import { raiseError } from 'src/utils/error-handling';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

interface UserCredentials {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserDoc>,
    private readonly jwtService: JwtService
  ) {}

  private encryptPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  async getAuthToken({ username, password }: UserCredentials) {
    const user = await this.userModel.findOne({ username });
    if (!user)
      raiseError('not-found');
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (isPasswordTrue) {
      return await this.jwtService.signAsync({ uid: user.id });
    }
  }

  async verifyAuthToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async signup({ username, password }: UserCredentials) {
    return await this.userModel.create({ username, password: this.encryptPassword(password) });
  }

  // Review: later, remove it. it is just for debugging
  async getAshkan() {
    return await this.userModel.findOne({ username: 'ashkan' });
  }
}