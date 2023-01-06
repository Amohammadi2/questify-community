import { FlexColumn, FlexRow } from 'modules/app-ui';
import { Button, Text } from '@nextui-org/react';
import { NextPageWithLayout } from "utils/next-layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { StepLine } from 'modules/app-ui/components/StepLine';
import { ManagerInfo } from './ManagerInfo';
import { SchoolInfo } from './SchoolInfo';
import { UserInfo } from './UserInfo';
import { FormContainer } from './FormContainer';
import { FormDescription } from './FormDescription';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import { useState } from 'react';
import { StepNumber } from '../interfaces/step.type';
import { useFormValidator } from '../hooks/useFormValidator';
import { IManagerInfoValidationResult, ISchoolInfoValidationResult, IUserInfoValidationResult } from '../interfaces/validation-results.interface';

export const RegistrationRequestPage: NextPageWithLayout = () => {

  const [state, dispatch] = useRegistrationForm();
  const [step, setStep] = useState<StepNumber>(1);
  const [validation, isStepValid] = useFormValidator(step, state);

  const getFormByStep = (step: StepNumber) => {
    switch (step) {
      case 1:
        return <ManagerInfo
          state={state}
          dispatch={dispatch}
          validationResult={validation as IManagerInfoValidationResult}
        />;
      case 2:
        return <UserInfo
          state={state}
          dispatch={dispatch}
          validationResult={validation as IUserInfoValidationResult}
        />;
      case 3:
        return <SchoolInfo
          state={state}
          dispatch={dispatch}
          validationResult={validation as ISchoolInfoValidationResult}
        />;
      default:
        throw Error('Maximum 3 steps supported');
    }
  }

  const handleNextStep = () => {
    if (isStepValid) {
      if (step === 3) { // :ref: the maximum number of steps
        alert('We are ready to send the form');
      }
      else {
        setStep(step + 1 as StepNumber);
      }
    }
  }

  return (
    <FlexColumn css={{ justifyContent: 'center', alignItems: 'center' }}>
      <FormContainer onSubmit={(e) => e.preventDefault()}>
        <Text h2 css={{ textAlign: 'center' }}>فرم ثبت نام مدارس</Text>
        <StepLine stepCount={3} inProgress={step} />
        {getFormByStep(step)}
        <FlexRow>
          <Button type="submit" css={{ mt: '$4', flexGrow: 1, mx: '$5' }}
            onClick={() => handleNextStep()}
            disabled={!isStepValid}
          >
            <span>
              {step === 3 ? 'ارسال فرم' : 'مرحله بعد'}
            </span>
          </Button>
          <Button type="submit" css={{ mt: '$4', minWidth: 'unset', mx: '$5' }} flat disabled={step === 1}
            onClick={() => setStep(step - 1 as StepNumber)}
          >
            <span>برگشت</span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </FlexRow>
        <FormDescription />
      </FormContainer>
    </FlexColumn>
  )
}


