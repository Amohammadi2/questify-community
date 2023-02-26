import { IUserSummery } from "modules/questions/shared/interfaces/user-summery.interface";
import { IComment } from "./comment.interface";

export interface IAnswer {
  content: string;
  accepted: boolean;
  publishDate: Date;
  score: number;
  author: IUserSummery;
  comments: IComment[];
  userVote: 'up'|'down';
}