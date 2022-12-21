import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { UserCredentials } from "src/auth/auth.service";
import { genUid } from "src/utils/uid";

interface RegistrationRequest {
  credentials: UserCredentials;
  managerEmail: string;
  managerPhonenumber: string;
  managerName: string;
  schoolName: string;
}


@Injectable()
export class RegistrationService {
  constructor(
    private readonly neo4j: Neo4jService
  ) {}

  async requestRegistration({ credentials, ...req }: RegistrationRequest) {
    const { records }= await this.neo4j.write(`
      CREATE (u:User $userPayload)-[:IS_MANAGER_OF]->(s:School $schoolPayload)
      RETURN s
    `, {
      userPayload: {
        ...credentials,
        email: req.managerEmail,
        phoneNumber: req.managerPhonenumber,
        nickname: req.managerName,
        isActive: false,
        uid: genUid()
      },
      schoolPayload: {
        name: req.schoolName
      }
    });
    return { ok: true }
  }

  async acceptRequest(userUId: string) {
    const { records } = await this.neo4j.write(`
      MATCH (u:User {uid:$uid})
      SET u.isActive = true
      RETURN u
    `, {
      uid: userUId
    });
    if (records.length === 0) {
      throw new Error('invalid-uid: User not found');
    }
    return { ok: true };
  }
}