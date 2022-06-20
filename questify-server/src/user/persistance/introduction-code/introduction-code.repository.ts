import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { Repository } from "src/repository.abstract";
import { IntroductionCodeModel, UserModel } from "../../domain/models";
import { UserMapper } from "../user";
import { IntroductionCodeMapper } from "./introduction-code.mapper";
import { IntroductionCodeNeo4j } from "./introduction-code.neo4j.interface";

@Injectable()
export class IntroductionCodeRepository extends Repository<IntroductionCodeNeo4j, IntroductionCodeModel> {
  
  protected nodeName: string = "IntroductionCode";

  constructor(
    neo4jService: Neo4jService,
    mapper: IntroductionCodeMapper,
    private readonly userMapper: UserMapper
  ) {
    super(neo4jService, mapper)
  }

  public async findByCode(code: string): Promise<IntroductionCodeModel | "not-found"> {
    return await this.findOneWhere("n.code = $code", { code });
  }

  public async getIntroductor(introCode: IntroductionCodeModel): Promise<UserModel | 'not-found'> {
    return this.traverseOne("n.code = $code", { code: introCode.code }, `<-[:HAS_INTRO_CODE]-(m:User)`, this.userMapper);
  }
}