import { Input, Text, Textarea } from '@nextui-org/react';
import { FormError } from '@utils/validation/components/FormError';
import { IFormPart } from '../interfaces/form-part.interface';
import { ISchoolInfoValidationResult } from '../interfaces/validation-results.interface';
import { FormPart } from "./FormPart";

export function SchoolInfo({ state, dispatch, validationResult } : IFormPart<ISchoolInfoValidationResult>) {
  return (
    <FormPart>
      <Text h3>اطلاعات مدرسه</Text>
      <Input labelPlaceholder="نام مدرسه" required
        css={{ my: '$8 '}}
        value={state.schoolName || ''}
        onChange={e=>dispatch({ type: 'school-name', payload: e.target.value })}
      />
      <FormError validationResult={validationResult.schoolName} value={state.schoolName} />
      <Input labelPlaceholder="وبسایت رسمی مدرسه" required
        css={{ my: '$8 '}}
        value={state.schoolWebsiteAddress || ''}
        onChange={e=>dispatch({ type: 'school-website-address', payload: e.target.value })}
      />
      <FormError validationResult={validationResult.schoolWebsiteAddress} value={state.schoolWebsiteAddress} />
      <Textarea labelPlaceholder="توضیحات" required
        css={{ my: '$8 '}}
        value={state.schoolDescription || ''}
        onChange={e=>dispatch({ type: 'school-description', payload: e.target.value })}
      />
      <FormError validationResult={validationResult.schoolDescription} value={state.schoolDescription} />
    </FormPart>
  );
}
