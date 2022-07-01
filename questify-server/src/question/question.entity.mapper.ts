import { Injectable } from "@nestjs/common";
import { QuestionEntity } from "./question.entity";
import { QuestionModel } from "./question.model";

@Injectable()
export class QuestionEntityMapper {
  public toEntity(question: QuestionModel): QuestionEntity {
    return {
      title: question.title,
      body: question.body,
      tags: question.tags,
      coverImageUrl: question.coverImage.url,
      attachmentUrls: question.attachments.map(a=>a.url),
      hasSaved: false,
      isFollowing: false,
      scores: 0
    };
  }
}