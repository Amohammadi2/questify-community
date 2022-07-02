// Todo: write a middleware to handle request authentication based on JWT token
import { NestMiddleware } from "@nestjs/common";
import { UserService } from "src/user/domain/user.service";
import { UserRepository } from "src/user/persistance";
import { JWTAuthPayload } from "./interfaces/jwt-auth-payload.interface";

const jwt = require('jsonwebtoken');

export class AuthMiddleware implements NestMiddleware {
  
  constructor(
    private readonly userRepository: UserRepository
  ) {}
  
  async use(req: Request | any, res: any, next: (error?: any) => void) {
    
    const authHeader: string = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
      const { userId } : JWTAuthPayload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userRepository.findOneByID(userId);
      if (user == "not-found") return;
      req.user = user;
    }
    catch (e) {
      req.user = null;
    }

    next();
  }
}