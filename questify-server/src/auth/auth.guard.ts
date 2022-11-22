import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { getErrorDetails } from "src/utils/error-handling";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  
  constructor(
    protected readonly authService: AuthService
  ) {}
  
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = this.getRequest(context);
    const token = await this.extractToken(headers);
    if (!token) return;
    try {
      const isVerified = await this.verifyToken(token);
      return await this.onVerificationComplete(token, isVerified);
    }
    catch(e) {
      const { code } = getErrorDetails(e);
      if (code == "invalid-token")
      throw new UnauthorizedException(e.message);
      throw(e);
    }
  }

  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getArgByIndex(2).req;
  }

  async extractToken(headers: Record<string, string>) {
    if (!headers.authorization)
      return false;
    if (!headers.authorization.startsWith('Bearer'))
      return false;

    const authHeader = headers.authorization.split(' ');
    if (authHeader.length != 2)
      return false;
    const [,token] = authHeader;

    return token;
  }

  async verifyToken(token: string): Promise<boolean> {
    return await this.authService.verifyAuthToken(token);
  }

  // this method can be overridden to provide extra verification steps
  protected async onVerificationComplete(token: string, isVerified: boolean): Promise<boolean> {
    return isVerified;
  }
}

type UserRoles = 'admin' | 'normal-user'

// we need to use type `any` to avoid errors related to
// the private internal function types (:ref: ts4060)
export function RoleGuard(role: UserRoles): any { 
  @Injectable()
  class RoleGuardCls extends AuthTokenGuard implements CanActivate {
    async onVerificationComplete(token: string, isVerified: boolean): Promise<boolean> {
      if (!isVerified) return false;
      const { isAdmin } = this.authService.getTokenPayload(token);
      switch(role) {
        case "admin":
          if(!isAdmin) throw new UnauthorizedException(
            'admins-only:Only admins have the right to perform this action'
          );
        default: isVerified
      }
    }
  }
  return RoleGuardCls;
}