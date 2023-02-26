import { IUserSummery } from "modules/questions/shared/interfaces/user-summery.interface";
import { IAnswer } from "./answer.interface";
import { IComment } from "./comment.interface";


export interface IQuestionDetails {
  id: string;
  title: string;
  author: IUserSummery;
  content: string;
  publishDate: Date;
  score: number;
  tags: string[];
  comments: IComment[];
  answers: IAnswer[];
  userVote: 'up'|'down';
}
