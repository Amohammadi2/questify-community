import { Entity } from "src/domain/shared/entity.absclass";
import { InvalidValueErr } from "../../exceptions/invalid-value.exception";

export interface InvitationInit {
  expirationDate: Date;
}

export interface InvitationRestore {
  code: string;
  expirationDate: Date;
}

export class Invitation extends Entity<InvitationInit, InvitationRestore> {
  private code: string;
  private expirationDate: Date;
  
  private static codeGenFeed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private static codeLength = 8; 

  init(data: InvitationInit): Invitation {
    Object.assign(this, data);
    this._validate();
    return this;
  }

  getFields(): InvitationRestore {
    return {
      code: this.code,
      expirationDate: this.expirationDate
    }
  }
  
  private _validate() {
    return this._validate_code(this.code);
  }

  private _validate_code(code: string) {
    if (code.length != Invitation.codeLength)
      throw new InvalidValueErr(`code should exactly have ${Invitation.codeLength} characters`)
  }

  getCode() { return this.code }
  private setCode(code: string) {
    this._validate_code(code);
    this.code = code;
  }

  // use this to initate the code field
  generateCode() {
    const feed = Invitation.codeGenFeed.split('');
    const codeArray = new Array(Invitation.codeLength).fill(null);
    for (let i=0; i<codeArray.length; i++) {
      codeArray[i] = feed[Math.round(Math.random() * (feed.length - 1))];
    }
    const code = codeArray.join('');
    this.setCode(code);
    return code;
  }

  isStillValid(): boolean {
    return (this.expirationDate.getTime() - new Date().getTime()) > 0;
  }
}