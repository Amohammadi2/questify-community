import { IUserSummery } from "./user-summery.interface";

export interface IEnvProfile {
  name: string;
  profileImg: string | null;
  description: string | null;
  nMembers: number;
  visibility: "PUBLIC" | "PRIVATE";
  admins: IUserSummery[];
}
