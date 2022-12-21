import { IHashService } from "../integrations/hash.service.integration";

export class HashedPassword {
  
  private hashedPassword: string;
  
  constructor(
    private readonly hashService: IHashService
  ) { }

  async init(rawPassword: string) {
    this.hashedPassword = await this.hashService.hash(rawPassword);
    return this;
  }

  async check(rawPassword: string) {
    return await this.hashService.compare(rawPassword, this.hashedPassword);
  }

  getValue() {
    return this.hashedPassword;
  }
}