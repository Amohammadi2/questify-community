import { exhaust } from "@utils/exhaustive-switch";
import { validateEmail } from "@utils/validation/email.validator";
import { validateLength } from "@utils/validation/length.validator";
import { validateNotEmpty } from "@utils/validation/notempty.validator";
import { validatePassword } from "@utils/validation/password.validator";
import { validatePhoneNumber } from "@utils/validation/phone-number.validator";
import { useValidateUsername } from "@utils/validation/username.validator";
import { IValidationResult } from "@utils/validation/validation-result.interface";
import { validateWebUrl } from "@utils/validation/weburl.validator";
import { StepNumber } from "../interfaces/step.type";
import { IManagerInfoValidationResult, ISchoolInfoValidationResult, IUserInfoValidationResult } from "../interfaces/validation-results.interface";
import { IFormState } from "./useRegistrationForm";

export const useFormValidator = (step: StepNumber, state: IFormState) => {

  const usernameValidity = useValidateUsername(state.username);

  const bakeResults = (validationObj: IManagerInfoValidationResult | IUserInfoValidationResult | ISchoolInfoValidationResult) => {
    return [validationObj, Object.entries(validationObj).map(v=>v[1].isValid).reduce((p, v)=>p && v)] as const;
  }

  switch(step) {
    case 1:
      const { managerEmail, managerName, managerPhoneNumber } = state;
      return bakeResults({
        managerEmail: validateEmail(managerEmail),
        managerName: validateNotEmpty(managerName) && validateLength(managerName, 3),
        managerPhoneNumber: validatePhoneNumber(managerPhoneNumber)
      })
      
    case 2:
      const { password } = state;
      return bakeResults({
        username: usernameValidity,
        password: validatePassword(password)
      })
    case 3:
      const { schoolName, schoolDescription, schoolWebsiteAddress } = state;
      return bakeResults({
        schoolName: validateNotEmpty(schoolName),
        schoolDescription: validateNotEmpty(schoolDescription),
        schoolWebsiteAddress: validateWebUrl(schoolWebsiteAddress)
      })
    default:
      exhaust(step);
  }
}