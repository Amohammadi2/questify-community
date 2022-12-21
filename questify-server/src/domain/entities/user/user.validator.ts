import { IAsyncValidator, IValidator } from "src/domain/shared/validator.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

export class UserRepoValidator implements IAsyncValidator<User> {

  constructor(private readonly repo: UserRepository) {}

  async validate(user: User) {
    const usernameIsDuplicate = await this.repo.checkUsernameExists(user.getUsername());
    return [
      !usernameIsDuplicate,
      [usernameIsDuplicate ? 'username-taken: The username has been taken before' : null].filter(v=>v!=null)
    ] as const; 
  }

}

