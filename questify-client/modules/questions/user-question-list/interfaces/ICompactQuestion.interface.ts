import { IUserSummery } from "modules/question-feed/interfaces/user-summery.interface";

export interface ICompactQuestion {
  id: string;
  title: string;
  author: IUserSummery;
  date: Date;
  tags: string[];
  nAnswers: number;
}
