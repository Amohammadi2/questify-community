export interface ICommuityProfile {
  id: string;
  name: string;
  profileImg: string | null;
  description: string | null;
  nMembers: number;
  visibility: "PUBLIC" | "PRIVATE";
}
