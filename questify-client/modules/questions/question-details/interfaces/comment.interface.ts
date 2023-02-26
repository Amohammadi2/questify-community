import { IUserSummery } from "modules/questions/shared/interfaces/user-summery.interface";

export interface IComment {
  id: string;
  text: string;
  author: IUserSummery;
  publishDate: Date;
}