export type ValidationErrorReport = readonly [isValid: boolean, validationErrors:Array<string>];

export interface IValidator <Data> {
  validate(data: Data): ValidationErrorReport;
}

export interface IAsyncValidator <Data> {
  validate(data: Data): Promise<ValidationErrorReport>;
}