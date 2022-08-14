import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UserAccountDoc } from "../../auth/database/user-account";
import { RoleCheckService } from "../role-check.service";


export function MemberRoleGuard(requiredRole: keyof RoleCheckService) {
  @Injectable()
  class GqlRoleGuard implements CanActivate {
    constructor(private readonly roleCheck: RoleCheckService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const user: UserAccountDoc =
        GqlExecutionContext.create(context).getContext().req.user;
      if (!user || !this.roleCheck[requiredRole](user))
        throw new ForbiddenException("You don't have the permission to perform this action");
      return true;
    }
  }

  return GqlRoleGuard as any;
}
