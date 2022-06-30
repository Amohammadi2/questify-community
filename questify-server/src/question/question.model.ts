import { IFileInfo } from "src/file-upload/interfaces/file-info.interface";
import { getUID } from "src/utils/get-uid";

interface IQuestionModel {
  id: string;
  title: string;
  body: string;
  attachments: IFileInfo[];
  coverImage: IFileInfo;
  tags: string[];
}

export class QuestionModel implements IQuestionModel {
  public id: string;
  public title: string;
  public body: string;
  public attachments: IFileInfo[];
  public coverImage: IFileInfo;
  public tags: string[];

  constructor(props: IQuestionModel) {
    Object.assign(this, props);
  }

  public static init(props: Omit<IQuestionModel, "id">) {
    return new QuestionModel({
      id: getUID(),
      ...props
    })
  }
}