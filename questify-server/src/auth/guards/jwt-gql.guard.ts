import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlJwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // we need to create a graphql execution context when
    // applying the guard on the graphql endpoint
    return GqlExecutionContext.create(context).getContext().req;
  }
}