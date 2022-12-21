import { IValidator, ValidationErrorReport } from "../../shared/validator.interface";
import { EmailAddress } from "./email-address.vo";

export class EmailAddressValidator implements IValidator<EmailAddress> {

  private regexFilter: RegExp = /[A-Za-z0-9\._]+@[a-z]+\.\w{2,3}/;

  validate(data: EmailAddress): ValidationErrorReport {
    const matches = this.regexFilter.test(data.getValue());
    return [
      matches,
      [matches ? null : 'Invalid email address'].filter(v => v != null)
    ];
  }

}
