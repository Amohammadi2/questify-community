import { Neo4jService } from "nest-neo4j/dist";
import { VerificationInfoModel } from "../models/verification-info.model";

export class VerificationInfoRepository {

  constructor(
    private readonly neo4jService: Neo4jService
  ) {}

  public async save(verificationInfo: VerificationInfoModel) {
    const result = await this.neo4jService.write(`
      CREATE (vi:VerificationInfo {
        userId: $userId,
        verificationCode: $verificationCode,
        expiresAt: $expiresAt
      })
      RETURN vi as verificationInfo;
    `, verificationInfo);

    if (result.records.length === 0) {
      return false
    }

    return true;
  } 
}