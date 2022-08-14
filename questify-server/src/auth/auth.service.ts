import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAccount, UserAccountDoc } from "./database/user-account";
import * as bcrypt from 'bcrypt';

interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAccount.name) private userAccount: Model<UserAccountDoc>,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(
    username: string,
    password: string,
  ): Promise<UserAccountDoc> {
    const user = await this.userAccount.findOne({ username });
    if (user && !user.isActive) {
      throw new UnauthorizedException('Your account is disabled');
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async generateAccessToken(user: UserAccountDoc) {
    const accessToken = this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
    return { access_token: accessToken };
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verify<JwtPayload>(token);
    } catch (e) {
      return { sub: null, username: null };
    }
  }
}


