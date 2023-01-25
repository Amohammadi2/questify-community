import { DateTime } from "neo4j-driver";

export class InvitationNeo4j {
  id: string;
  expirationDate: DateTime<number>;
  code: string;
}