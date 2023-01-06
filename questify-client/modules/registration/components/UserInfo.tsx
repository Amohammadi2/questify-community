import { Input, Text } from '@nextui-org/react';
import { FormError } from '@utils/validation/components/FormError';
import { IFormPart } from '../interfaces/form-part.interface';
import { IUserInfoValidationResult } from '../interfaces/validation-results.interface';
import { FormPart } from "./FormPart";

export function UserInfo({ state, dispatch, validationResult } : IFormPart<IUserInfoValidationResult>) {
  return (
    <FormPart>
      <Text h3>اطلاعات حساب کاربری</Text>
      <Input labelPlaceholder="نام کاربری درخواستی" required css={{ mt: '$10' }}
        value={state.username || ''}
        onChange={e=>dispatch({ type: 'username', payload: e.target.value })}
      />
      <FormError validationResult={validationResult.username} value={state.username} />
      <Text color="$gray700">این نام کاربری تا زمان رد یا تایید درخواست شما رزرو خواهد شد</Text>
      <Input.Password labelPlaceholder="رمز عبور" required css={{ mt: '$10' }}
        value={state.password || ''}
        onChange={e=>dispatch({ type: 'password', payload: e.target.value })}
      />
      <FormError validationResult={validationResult.password} value={state.password} />
    </FormPart>
  );
}
