import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { IFileInfo } from 'src/file-upload/interfaces/file-info.interface';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { AskQuestionInput } from './dto/ask-question.input';
import { QuestionModel } from './question.model';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {

  private readonly coverImagePath  = '/questions/cover-images';
  private readonly attachmentsPath = '/questions/attachments';
 
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly questionRepository: QuestionRepository
  ) {}

  public async askQuestion(askQuestionInput: AskQuestionInput): Promise<QuestionModel | "create-failed"> {

    const coverImageResult = await this.fileUploadService
      .storeFile(this.coverImagePath, askQuestionInput.coverImage);
    const attachmentsResult = await this.fileUploadService
      .storeMultiple(this.attachmentsPath, askQuestionInput.attachments);
    
    const model = QuestionModel.init({
      ...askQuestionInput, // regular fields
      coverImage: coverImageResult, 
      attachments: attachmentsResult
    })

    let question = await this.questionRepository.create(model);
    
    if (question == "create-failed") {
      // retry to create question
      question = await this.questionRepository.create(model);
      if (question == "create-failed") {
        // clean up if the process failed the second time
        this.fileUploadService.unlink(coverImageResult.path);
        this.fileUploadService.unlinkMultiple(attachmentsResult);
        return "create-failed";
      }
    }
    return question;
  }

  public async addAttachments(attachments: FileUpload[]): Promise<IFileInfo[]> {
    return this.fileUploadService.storeMultiple('/questions/attachments', attachments);
  }

  public async removeAttachments(questionId: string, ids: string[]): Promise<"ok" | "error" | "question-not-found"> {
    const question = await this.questionRepository.findOneByID(questionId);
    
    if (question === "not-found") 
      return "question-not-found";

    return this.fileUploadService
      .unlinkMultiple(question.attachments.filter(a => ids.includes(a.id))) ? "ok" : "error";
  }
}