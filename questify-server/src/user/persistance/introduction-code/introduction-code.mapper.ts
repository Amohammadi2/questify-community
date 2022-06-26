import { Injectable } from "@nestjs/common";
import { IMapper } from "src/mapper.interface";
import { IntroductionCodeModel } from "../../domain/models";
import { IntroductionCodeNeo4j } from "./introduction-code.neo4j.interface";

@Injectable()
export class IntroductionCodeMapper implements IMapper<IntroductionCodeNeo4j, IntroductionCodeModel> {
  toNeoModel(domainModel: IntroductionCodeModel): IntroductionCodeNeo4j {
    return new IntroductionCodeNeo4j(domainModel);
  }
  toDomainModel(neoModel: IntroductionCodeNeo4j): IntroductionCodeModel {
    return new IntroductionCodeModel(neoModel);
  }
}