import { CreateInvitationCodeHandler } from './create-invitation-code.handler';
import { RegisterUserHandler } from './register-user.handler';
import { SignUpWithInvitationHandler } from './signup-with-invitation.handler';

export const handlers = [
  CreateInvitationCodeHandler,
  RegisterUserHandler,
  SignUpWithInvitationHandler,
];
