import { Module } from "@nestjs/common";import { QuestionEntityMapper } from "./question.entity.mapper";
;
import { QuestionRepository } from "./question.repository";
import { QuestionResolver } from "./question.resolver";
import { QuestionService } from "./question.service";

@Module({
  providers: [QuestionService, QuestionRepository, QuestionResolver, QuestionEntityMapper]
})
export class QuestionModule {}