import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { Repository } from "src/repository.abstract";
import { IntroductionCodeModel } from "../../domain/models";
import { IntroductionCodeMapper } from "./introduction-code.mapper";
import { IntroductionCodeNeo4j } from "./introduction-code.neo4j.interface";

@Injectable()
export class IntroductionCodeRepository extends Repository<IntroductionCodeNeo4j, IntroductionCodeModel> {
  
  constructor(
    neo4jService: Neo4jService,
    mapper: IntroductionCodeMapper
  ) {
    super(neo4jService, mapper)
  }

  public async findByCode(code: string): Promise<IntroductionCodeModel | "not-found"> {
    return this.findOneWhere("n.code = $code", { code });
  }

  public async getIntroductor(introCode: IntroductionCodeModel) {
    
  }
}