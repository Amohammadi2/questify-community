import { Injectable } from "@nestjs/common";
import { EntityRepository } from "src/repository.abstract";
import { QuestionModel } from "../domain/models/question.model";
import { QuestionNeo4j } from "./question.neo4j";

@Injectable()
export class QuestionRepository extends EntityRepository<QuestionNeo4j, QuestionModel> {
  
}