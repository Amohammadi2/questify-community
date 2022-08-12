import { CreateInvitationCodeResolver } from '../../school-management/graphql/mutations/create-invitation.resolver';
import { SignUpWithInvitationResolver } from '../../school-management/graphql/mutations/signup-with-invitation.resolver';

export const resolvers = [
  CreateInvitationCodeResolver,
  SignUpWithInvitationResolver
];