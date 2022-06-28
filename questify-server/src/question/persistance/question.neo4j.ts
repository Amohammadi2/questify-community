import { INeoModel } from "src/neomodel.interface";

interface IQuestionNeo4j extends INeoModel {
  id: string;
  title: string;
  body: string;
  attachments: string[];
  coverImageUrl: string;
  tags: string[];
}

export class QuestionNeo4j implements IQuestionNeo4j {
  public id: string;
  public title: string;
  public body: string;
  public attachments: string[];
  public coverImageUrl: string;
  public tags: string[];

  constructor(props: IQuestionNeo4j) { Object.assign(this, props); }

}