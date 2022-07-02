import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { EntityRepository } from "src/repository.abstract";
import { UserModel } from "../../domain/models";
import { UserMapper } from "./user.mapper";
import { UserNeo4j } from "./user.neo4j.interface";


@Injectable()
export class UserRepository extends EntityRepository<UserNeo4j, UserModel> {

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


  public async connectAsIntroductor(user: UserModel, introductor: UserModel): Promise<"ok"> {
    await this.neo4jService.write(`
      MATCH (u1:User {id: $userId}), (u2:User {id: $introductorId})
      MERGE (u1)-[:INTRODUCED_BY]->(u2)
    `, { userId: user.id, introductorId: introductor.id });

    return "ok";
  }
}