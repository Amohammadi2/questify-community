import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { getErrorDetails } from "src/utils/error-handling";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  
  constructor(
    private readonly authService: AuthService
  ) {}
  
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = GqlExecutionContext.create(context).getArgByIndex(2).req;
    
    if (!headers.authorization)
      return false;
    if (!headers.authorization.startsWith('Bearer'))
      return false;

    const authHeader = headers.authorization.split(' ');
    if (authHeader.length != 2)
      return false;
    const [,token] = authHeader;

    try {
      return this.verifyToken(token);
    }
    catch(e) {
      const { code } = getErrorDetails(e);
      if (code == "invalid-token")
        throw new UnauthorizedException(e.message);
      throw(e);
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    return await this.authService.verifyAuthToken(token);
  }
}