import { IHashService } from "../integrations/hash.service.integration";
import { Restorable } from "../shared/restorable.interface";

export class HashedPassword implements Restorable<string> {
  
  private hashedPassword: string;
  
  constructor(
    private readonly hashService: IHashService
  ) { }

  restore(data: string): HashedPassword {
    this.hashedPassword = data;
    return this;
  }

  async init(rawPassword: string) {
    this.hashedPassword = await this.hashService.hash(rawPassword);
    return this;
  }

  async check(rawPassword: string) {
    console.log('R vo:', rawPassword, this.hashedPassword);
    return await this.hashService.compare(rawPassword, this.hashedPassword);
  }

  getValue() {
    return this.hashedPassword;
  }
}