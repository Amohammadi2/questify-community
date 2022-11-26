import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { raiseError } from "src/utils/error-handling";
import { toObjectId } from "src/utils/to-object-id";
import { QuestionDoc, QuestionEntity, QuestionTagDoc, QuestionTagEntity } from "./questions.entities";


interface QuestionPayload {
  content: string;
  author: string;
  tags: [];
}

@Injectable()
export class QuestionService {

  constructor(
    @InjectModel(QuestionEntity.name) private readonly questionModel: Model<QuestionDoc>,
    private readonly tagService: TagService
  ) {}

  async askQuestion({ tags, ...payload }: QuestionPayload) {
    try {
      const question = await this.questionModel.create({ tags, ...payload });
      await this.tagService.insertTag(tags);
      return question;
    }
    catch(e) {
      raiseError('failed', 'Failed to persist the question');
    }
  }

  async removeQuestion(id: string) {
    const question = await this.questionModel.findById(toObjectId(id));
    if (!question) raiseError('not-found', "Couldn't find any question with the id of: "+id);
    try {
      await question.delete();
    }
    catch(e) {
      raiseError('failed', "Couldn't remove the question from db");
    }
  }

}

@Injectable()
export class TagService {
  
  constructor(
    @InjectModel(QuestionTagEntity.name) private readonly questionTagModel: Model<QuestionTagDoc>
  ) {}

  async insertTag(tags: string[]) {
    // insert the tag and set the `nOfPosts` field to 1 if the tag
    // doesn't exist already. Otherwise, don't insert the duplicate
    // tag and just increment the `nOfPosts` field by 1
    await this.questionTagModel
      .updateMany(
        {name: {$in: tags}},
        {$inc: { nOfPosts: 1 }},
        {upsert: true}
      );
  }

}