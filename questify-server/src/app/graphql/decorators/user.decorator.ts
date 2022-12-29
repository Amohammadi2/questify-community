import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// :Note: This piece of code is only compatible with GraphQL endpoints
// it needs modifications to be used in REST and WS endpoints and etc...
export const User = createParamDecorator((_data, ctx: ExecutionContext) => {
  const { user } = GqlExecutionContext.create(ctx).switchToHttp().getRequest();
  return user;
})
