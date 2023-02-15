import { IUserSummery } from "../../shared/interfaces/user-summery.interface";

export interface ICompactQuestion {
  id: string;
  title: string;
  author: IUserSummery;
  date: Date;
  tags: string[];
  nAnswers: number;
}
