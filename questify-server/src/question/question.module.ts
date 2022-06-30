import { Module } from "@nestjs/common";
import { FileUploadModule } from "src/file-upload/file-upload.module";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";

@Module({
  providers: [QuestionService, QuestionRepository]
})
export class QuestionModule {}