import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user/user.entity";
import { IHashService } from "src/domain/integrations/hash.service.integration";
import { HashedPassword } from "src/domain/vos/hashed-password.vo";
import { Neo4jMapper } from "../shared/neo4j.mapper.interface";
import { UserNeo4j } from "./user.neo4j.model";



@Injectable()
export class UserNeo4jMapper implements Neo4jMapper<User, UserNeo4j> {

  constructor(
    private readonly hashService: IHashService 
  ) {}
  
  toNeo4j(entity: User): UserNeo4j {
    const { hashedPassword, isActive, username, id } = entity.getFields();
    return {
      username,
      password: hashedPassword.getValue(),
      isActive,
      id
    }
  }
  
  toEntity(neo4j: UserNeo4j): User {
    const { username, password, isActive, id } = neo4j;
    console.log('Entity Restore: ', neo4j);
    return new User().restore({
      hashedPassword: new HashedPassword(this.hashService).restore(password),
      username,
      isActive,
      id
    })
  }

}