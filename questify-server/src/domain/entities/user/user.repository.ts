import { CredentialsDTO } from "src/domain/dtos/credentials.dto";
import { User } from "./user.entity";
import { Repository } from "../../shared/repository.absclass";
import { UserRepoValidator } from "./user.validator";

export abstract class UserRepository extends Repository<User> {
  
  getValidator() {
    return new UserRepoValidator(this);
  }

  abstract findById: (id: string)=>Promise<User|null>;
  abstract checkUsernameExists: (username: string)=>Promise<boolean>;
  abstract findByCredentials: (credentials: CredentialsDTO)=>Promise<User|null>;
  protected abstract persist(user: User): Promise<boolean>;

}
