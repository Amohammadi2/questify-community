import { IUserProfile } from "../../user-profile/entities";

export interface IQuestion {
  title: string;
  content: string;
  tags: string[];
  author: IUserProfile
}

export interface IQuestionInput {
  title: string;
  content: string;
  tags: string[];
}
