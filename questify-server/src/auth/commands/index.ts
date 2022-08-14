import { CreateUserAccountHandler } from "./handlers/create-user-account.handler";
import { SetAccountActiveStatusHandler } from "./handlers/set-account-active-status.handler";

export * from "./commands";

export const handlers = [
  CreateUserAccountHandler,
  SetAccountActiveStatusHandler
];