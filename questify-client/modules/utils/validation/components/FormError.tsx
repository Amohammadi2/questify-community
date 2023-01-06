import { Loading, Text, styled } from '@nextui-org/react';
import { IValidationResult } from "../validation-result.interface";

interface IFormErrorProps {
  value: any;
  validationResult: IValidationResult;
}

const SpinnerContainer = styled('div', {
  d: 'flex',
  my: '$3',
})

export const FormError = ({ validationResult, value } : IFormErrorProps) => {
  if (value == null || value.length === 0 || validationResult.isValid) {
    return null;
  }
  if (validationResult.pending) {
    return (
      <SpinnerContainer>
        <Loading />
        <Text css={{ mx: '$6' }}>در حال برسی ...</Text>
      </SpinnerContainer>
    )
  }
  return (
    <Text color="error">{validationResult.errors.join(', ')}</Text>
  )
}