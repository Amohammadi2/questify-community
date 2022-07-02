import { createParamDecorator } from "@nestjs/common";
import { UserModel } from "src/user/domain/models";

export const CurrentUser = createParamDecorator((_, req: any) => {
  return req.user as UserModel;
})
