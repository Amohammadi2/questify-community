import { IAccount } from "../../auth/entities";

export interface IUserProfile {
  profileImageUrl: string | null;
  account: IAccount;
}