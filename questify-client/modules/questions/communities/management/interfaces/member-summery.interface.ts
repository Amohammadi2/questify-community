import { IUserSummery } from "modules/questions/shared/interfaces/user-summery.interface";

export interface IMemberSummery extends IUserSummery {
  score: number;
}