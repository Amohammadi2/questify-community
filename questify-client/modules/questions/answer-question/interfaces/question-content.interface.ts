import { IUserSummery } from "modules/questions/shared/interfaces/user-summery.interface";

export interface IQuestionContent {
  title: string;
  content: string;
  author: IUserSummery;
}