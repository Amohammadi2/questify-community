import { gql, useMutation } from '@apollo/client';
import { IFormState } from '../hooks/useRegistrationForm';

const REQUEST_REGISTRATION = gql`
  mutation RequestRegistration($input: RegistrationRequestInput!) {
    requestRegistration(input: $input)
  }
`;

interface IServerPayload {
  managerInfo: {
    name: string|null;
    email: string|null;
    phoneNumber: string|null;
  };
  userInfo: {
    username: string|null;
    password: string|null;
  };
  schoolInfo: {
    name: string|null;
    description: string|null;
    websiteAddress: string|null;
  }
}

const formToPayloadAdaptor = (formState: IFormState): IServerPayload => {
  return {
    managerInfo: {
      name: formState.managerName,
      email: formState.managerEmail,
      phoneNumber: formState.managerPhoneNumber
    },
    userInfo: {
      username: formState.username,
      password: formState.password
    },
    schoolInfo: {
      name: formState.schoolName,
      websiteAddress: formState.schoolWebsiteAddress,
      description: formState.schoolDescription
    }
  }
}

export function useRequestRegistration(formState: IFormState) {
  const [requestRegistration, { data, ...states }] = useMutation<any, {input: IServerPayload}>(REQUEST_REGISTRATION);

  return {
    async requestRegistration() {
      return requestRegistration({
        variables: {
          input: formToPayloadAdaptor(formState)
        }
      })
    },
    data: data?.requestRegistration,
    ...states
  };

}