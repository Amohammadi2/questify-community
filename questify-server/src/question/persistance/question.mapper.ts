import { Injectable } from "@nestjs/common";
import { IMapper } from "src/mapper.interface";
import { QuestionModel } from "../domain/models/question.model";
import { QuestionNeo4j } from "./question.neo4j";

@Injectable()
export class QuestionMapper implements IMapper<QuestionNeo4j, QuestionModel> {
  public toNeoModel(domainModel: QuestionModel): QuestionNeo4j {
    return new QuestionNeo4j(domainModel);
  }
  public toDomainModel(neoModel: QuestionNeo4j): QuestionModel {
    return new QuestionNeo4j(neoModel);
  }
}