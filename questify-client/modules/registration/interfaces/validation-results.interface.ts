import { IValidationResult } from "@utils/validation/validation-result.interface";

export interface IManagerInfoValidationResult {
  managerName: IValidationResult;
  managerEmail: IValidationResult;
  managerPhoneNumber: IValidationResult;
}

export interface IUserInfoValidationResult {
  username: IValidationResult;
  password: IValidationResult;
}

export interface ISchoolInfoValidationResult {
  schoolName: IValidationResult;
  schoolDescription: IValidationResult;
  schoolWebsiteAddress: IValidationResult;
}