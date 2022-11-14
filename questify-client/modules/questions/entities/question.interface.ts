import { IUserProfile } from "../../user-profile/entities";

export interface IQuestionTitle {
  title: string;
}

export interface IQuestionCover {
  coverImageUrl: string;
  tags: string[];
}

export interface IQuestionStats {
  numberOfAnswers: number;
  numberOfComments: number;
  numberOfWarnings: number;
  numberOfScores: number;
}

export interface IQuestionMetaData {
  author: IUserProfile
}

export interface IQuestionContent {
  content: string;
}

export interface IQuestionWD {
  id: string;
  title: string;
  content: string;
  tags: string[];
  score: number;
  author: IUserProfile;
}

export interface IQuestionInput {
  content: string;
  tags: string[];
}

