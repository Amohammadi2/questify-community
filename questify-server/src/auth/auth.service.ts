import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user-social/user-social.schemas';
import * as bcrypt from "bcrypt";

interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async authenticateUser(username: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async generateAccessToken(user: UserDocument) {
    const accessToken = this.jwtService.sign({
      username: user.username, sub: user.id
    });
    return { access_token: accessToken };
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verify<JwtPayload>(token);
    }
    catch(e) {
      return { sub: null, username: null };
    }
  }
}
