import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { Repository } from "src/repository.abstract";
import { UserModel } from "../../domain/models";
import { UserMapper } from "./user.mapper";
import { UserNeo4j } from "./user.neo4j.interface";


@Injectable()
export class UserRepository extends Repository<UserNeo4j, UserModel> {

  protected nodeName: string = "User";

  constructor(
     neo4jService: Neo4jService,
     mapper: UserMapper
  ) {
    super(neo4jService, mapper);
  }

  public async usernameExists(username: string): Promise<boolean> {
    return this.existsWhere("n.username = $username", { username });
  }

  public async findOneByAuthCredentials(credentials: {
    username: string,
    password: string
  }): Promise<UserModel | "not-found"> {
    return this.findOneWhere("n.username = $username AND n.password = $password", credentials);
  }

}