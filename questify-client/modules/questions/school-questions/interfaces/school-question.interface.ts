import { IUserProfile } from "modules/user-profile/entities";

export interface ISchoolQuestion {
  id: string;
  title: string;
  scores: number;
  nComments: number;
  nAnswers: number;
  author: IUserProfile;
  isChallenge?: boolean;
  hasTextExplanation?: boolean;
  hasVideoExplanation?: boolean;
  tags: string[];
}
