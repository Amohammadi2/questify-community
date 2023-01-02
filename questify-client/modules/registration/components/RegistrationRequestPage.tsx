import { FlexColumn, FlexRow } from 'modules/app-ui';
import { Button, Textarea } from '@nextui-org/react';
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

export const RegistrationRequestPage: NextPageWithLayout = () => {
  
  const [state, dispatch] = useRegistrationForm();
  const [step, setStep] = useState<1|2|3>(1);

  const getFormByStep = (step: 1|2|3) => {
    switch(step) {
      case 1:
        return <ManagerInfo state={state} dispatch={dispatch} />;
      case 2:
        return <UserInfo state={state} dispatch={dispatch} />;
      case 3:
        return <SchoolInfo state={state} dispatch={dispatch} />;
      default:
        throw Error('Maximum 3 steps supported');
    }
  }

  const handleNextStep = () => {
    if (step === 3) { // :ref: the maximum number of steps
      alert('We are ready to send the form');
    }
    else {
      setStep(step + 1 as (1|2|3));
    }
  }

  return (
    <FlexColumn css={{ justifyContent: 'center', alignItems: 'center' }}>
      <FormContainer onSubmit={(e)=>e.preventDefault()}>
        <StepLine stepCount={3} inProgress={step} />
        {getFormByStep(step)}
        <FlexRow>
          <Button type="submit" css={{ mt: '$4', flexGrow: 1, mx: '$5' }}
            onClick={()=>handleNextStep()}
          >
            <span>
              {step === 3 ? 'ارسال فرم' : 'مرحله بعد'}
            </span>
          </Button>
          <Button type="submit" css={{ mt: '$4', minWidth: 'unset', mx: '$5' }} flat disabled={step === 1}
            onClick={()=>setStep(step - 1 as (1|2|3))}
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


