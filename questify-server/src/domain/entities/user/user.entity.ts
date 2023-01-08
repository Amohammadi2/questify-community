import { IHashService } from "src/domain/integrations/hash.service.integration";
import { HashedPassword } from "../../vos/hashed-password.vo";
import { Entity } from '../../shared/entity.absclass';

export interface IUserInit {
  username: string;
  password: HashedPassword;
  isActive: boolean;
}

export interface IUserRaw {
  id: string;
  username: string;
  hashedPassword: HashedPassword;
  isActive: boolean;
}

export class User extends Entity<IUserInit, IUserRaw> {
  private username: string;
  private hashedPassword: HashedPassword;
  private isActive: boolean;

  constructor() { super() }

  getFields(): IUserRaw {
    return {
      username: this.username,
      hashedPassword: this.hashedPassword,
      isActive: this.isActive,
      id: this.getId()
    }
  }

  init(props: IUserInit) {
    this.username = props.username;
    this.hashedPassword = props.password;
    this.isActive = props.isActive;
    return this;
  }

  restore(data: IUserRaw): User {
    super.restore(data);
    this.username = data.username;
    this.hashedPassword = data.hashedPassword;
    this.isActive = data.isActive;
    return this;
  }

  async setPassword(hashedPassword: HashedPassword) {
    this.hashedPassword = hashedPassword;
  }

  getPassword() {
    return this.hashedPassword;
  }

  setUsername(uname: string) {
    this.username = uname;
  }

  getUsername() { return this.username }

  getIsActive(): boolean {
    return this.isActive;
  }
  
  setIsActive(value: boolean) {
    this.isActive = value;
  }
}