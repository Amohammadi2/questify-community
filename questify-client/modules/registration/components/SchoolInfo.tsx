import { Input, Text, Textarea } from '@nextui-org/react';
import { IFormPart } from '../interfaces/form-part.interface';
import { FormPart } from "./FormPart";

export function SchoolInfo({ state, dispatch } : IFormPart) {
  return (
    <FormPart>
      <Text h3>اطلاعات مدرسه</Text>
      <Input labelPlaceholder="نام مدرسه" required
        css={{ my: '$8 '}}
        value={state.schoolName || ''}
        onChange={e=>dispatch({ type: 'school-name', payload: e.target.value })}
      />
      <Textarea labelPlaceholder="توضیحات" required
        css={{ my: '$8 '}}
        value={state.schoolDescription || ''}
        onChange={e=>dispatch({ type: 'school-description', payload: e.target.value })}
      />
    </FormPart>
  );
}
