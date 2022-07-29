import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// CUser => Curent User
export const CUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => GqlExecutionContext.create(ctx).getContext().req.user
);