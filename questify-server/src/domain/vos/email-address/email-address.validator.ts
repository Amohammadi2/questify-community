import { IValidator, ValidationErrorReport } from "../../shared/validator.interface";
import { EmailAddress } from "./email-address.vo";

export class EmailAddressValidator implements IValidator<EmailAddress> {

  private regexFilter: RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

  validate(data: EmailAddress): ValidationErrorReport {
    const matches = this.regexFilter.test(data.getValue());
    return [
      matches,
      [matches ? null : 'Invalid email address'].filter(v => v != null)
    ];
  }

}
