import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "./jwt.constants";

@Injectable()
export class AppJwtService {
  
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async encode(obj: object): Promise<string> {
    return this.jwtService.sign(obj)
  }

  async decode(token: string): Promise<object> {
    const contents = await this.jwtService.decode(token);
    if (typeof contents == "string")
      return { contents };
    return contents;
  }

  async verify(token: string): Promise<object> {
    return this.jwtService.verify(token, { secret: JWT_SECRET });
  }
  
}