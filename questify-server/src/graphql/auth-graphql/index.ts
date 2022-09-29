import { AuthResolver } from "./auth.resolver";
import { CreateUserAccountResolver } from "./mutations/create-user-account.resolver";
import { SetAccountActiveStatusResolver } from "./mutations/set-account-active-status.resolver";

export const authResolvers = [
  AuthResolver,
  CreateUserAccountResolver,
  SetAccountActiveStatusResolver
];