import { Module } from "@nestjs/common";
import { QuestionMapper } from "./persistance/question.mapper";
import { QuestionRepository } from "./persistance/question.repository";

@Module({
  providers: [QuestionMapper, QuestionRepository]
})
export class QuestionModule {}