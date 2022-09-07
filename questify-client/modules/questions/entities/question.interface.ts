import { IUserProfile } from "../../user-profile/entities";

export interface IQuestion {
  id: string;
  title: string;
  content: string;
  tags: string[];
  score: number;
  author: IUserProfile;
}

export interface IQuestionInput {
  title: string;
  content: string;
  tags: string[];
}

export type IQuestionFilter = "top" | "new" | "controversial";