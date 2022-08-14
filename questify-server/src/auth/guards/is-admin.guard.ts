import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UserAccountDoc } from '../database/user-account';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: UserAccountDoc = GqlExecutionContext.create(context).getContext().req.user;
    return (user && user.isAdmin);
  }
}
