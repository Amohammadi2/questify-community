import { v4 as uidV4 } from 'uuid';
import { Initializable } from './initializable.interface';
import { Restorable } from './restorable.interface';
import { IValidator, ValidationErrorReport } from './validator.interface';

export abstract class Entity<InitData, RestorableData>
  implements Restorable<RestorableData>, Initializable<InitData>
{
  
  private id: string;

  constructor() {
    this.id = uidV4();
  }

  
  abstract getFields(): RestorableData;
  
  init(data: InitData): Entity<InitData, RestorableData> {
    const isValid = this.getValidator().validate(data);
    
    Object.assign(this, data);
    return this;
  }

  public restore(raw: RestorableData): Entity<InitData, RestorableData> {
    Object.assign(this, raw);
    return this;
  }

  public getId() {
    return this.id;
  }

  public getValidator(): IValidator<InitData> {
    return {
      validate(data: InitData): ValidationErrorReport {
        return [true, []];
      }
    }
  }

}