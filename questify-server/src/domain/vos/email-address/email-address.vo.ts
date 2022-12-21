import { ValidationErr } from "src/domain/exceptions/validation.exception";
import { Initializable } from "../../shared/initializable.interface";
import { Restorable } from "../../shared/restorable.interface";
import { EmailAddressValidator } from "./email-address.validator";

interface IEmailAddressRestore {
  address: string;
}

interface IEmailAddressInit {
  address: string;
}

export class EmailAddress implements Restorable<IEmailAddressRestore>, Initializable<IEmailAddressInit> {
  private address: string;
  private validator: EmailAddressValidator;
  
  constructor() {
    this.validator = new EmailAddressValidator();
  }

  init(data: IEmailAddressInit): EmailAddress {
    Object.assign(this, data);
    const [isValid, errors] = this.validator.validate(this);
    if (!isValid)
      throw new ValidationErr(errors);
    return this;
  }
  
  restore(data: IEmailAddressRestore): EmailAddress {
    Object.assign(this, data)
    return this;
  }

  getValue() {
    return this.address;
  }
}

