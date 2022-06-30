import { Injectable } from "@nestjs/common";
import { EntityRepository } from "src/repository.abstract";
import { QuestionModel } from "./question.model";


@Injectable()
export class QuestionRepository extends EntityRepository<QuestionModel, QuestionModel> {
  
}