import { Entity } from "src/domain/shared/entity.absclass";
import { EmailAddress } from "src/domain/vos/email-address/email-address.vo";

export interface IProfileInit {
  bio: string;
  email: EmailAddress;
  phoneNumber: string;
  nickname: string;
}

export interface IProfileRestore {
  bio: string;
  email: EmailAddress;
  phoneNumber: string;
  nickname: string;
}

export class Profile extends Entity<IProfileInit, IProfileRestore> {

  private nickname: string;
  private bio: string;
  private email: EmailAddress;
  private phoneNumber: string; // Todo:(VO) replace with a value object

  init(data: IProfileInit): Profile {
    throw new Error("Method not implemented.");
  }

  restore(data: IProfileRestore): Profile {
    super.restore(data);
    return this;
  }

  getFields(): IProfileRestore {
    return {
      bio: this.bio,
      email: this.email,
      phoneNumber: this.phoneNumber,
      nickname: this.nickname
    }
  }
}