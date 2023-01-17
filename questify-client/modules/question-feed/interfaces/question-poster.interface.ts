import { IUserSummery } from "./user-summery.interface";

export interface IQuestionPoster {
  title: string;
  tags: string[];
  id: string;
  scores: number;
  nComments: number;
  nAnswers: number;
  recentAnswers: {
    answerId: string;
    author: IUserSummery
  }[];
  author: IUserSummery
}
