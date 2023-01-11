import { ValidationErr } from "../exceptions/validation.exception";
import { ITransactionUnit } from "../integrations/transaction-manager.integration";
import { Entity } from "./entity.absclass";
import { IAsyncValidator, IValidator } from "./validator.interface";


export abstract class Repository <E extends Entity<unknown, unknown>, PersistanceMetadata=null> {
  
  constructor() {
    this.validator = this.getValidator();
  }

  private validator: IAsyncValidator<E>;
  
  getValidator(): IAsyncValidator<E> {
    return { // Default validator which always returns true
      async validate(data: E) {
        return [true, []];
      }
    }
  }

  abstract instantiate(): E;
  abstract remove(tx: ITransactionUnit, entity: E): Promise<boolean>;
  protected abstract persist(tx: ITransactionUnit, entity: E, metadata: PersistanceMetadata): Promise<boolean>;

  async save(tx: ITransactionUnit, entity: E, metadata: PersistanceMetadata = null) {
    const [isValid, errors] = await this.validator.validate(entity);
    if (isValid)
      return await this.persist(tx, entity, metadata);
    else
      throw new ValidationErr(errors);
  }
}