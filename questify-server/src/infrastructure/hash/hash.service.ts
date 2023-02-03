import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { IHashService } from "src/domain/integrations/hash.service.integration";


@Injectable()
export class HashService implements IHashService {

  async hash(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, bcrypt.genSaltSync());
  }
  
  async compare(rawPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, hash);    
  }

}