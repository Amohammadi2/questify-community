import { Input, Text } from '@nextui-org/react';
import { IFormPart } from '../interfaces/form-part.interface';
import { FormPart } from "./FormPart";



export function ManagerInfo({ state, dispatch } : IFormPart) {
  return (
    <FormPart>
      <Text h3>اطلاعات مدیر</Text>
      <Input labelPlaceholder="نام مدیر" required css={{ mt: '$10' }}
        value={state.managerName || ''}
        onChange={(e)=>dispatch({ type: 'manager-name', payload: e.target.value })}
      />
      <Input labelPlaceholder="ایمیل مدیر" type="email" required css={{ mt: '$10' }}
        value={state.managerEmail || ''}
        onChange={(e)=>dispatch({ type: 'manager-email', payload: e.target.value })}
      />
      <Input labelPlaceholder="شماره تلفن همراه مدیر" pattern="0[0-9]{10}" required css={{ mt: '$10' }}
        value={state.managerPhoneNumber || ''}
        onChange={(e)=>dispatch({ type: 'manager-phone-number', payload: e.target.value })}
      />
    </FormPart>
  );
}
