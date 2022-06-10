import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { IUserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {

  private static entityLabel = "User";

  constructor (
    public readonly neo4jService: Neo4jService
  ){}

  public async persist(user: IUserEntity): Promise<IUserEntity> {

    const dbPayload: IUserEntity = {
      uid: user.uid,
      username: user.username,
      password: user.password,
      email: user.email
    };

    await this.neo4jService.write(`
      CREATE (${UserRepository.entityLabel} {
        uid: $uid,
        username: $username,
        email: $email,
        password: $password
      })
    `, dbPayload);

    return user;
  }
}