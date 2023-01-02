import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { Profile } from "src/domain/entities/profile/profile.entity";
import { IProfileMetadata, ProfileRepository } from "src/domain/entities/profile/profile.repository";
import { OpertationFailedErr } from "src/domain/exceptions/operation-failed.exception";
import { AppTransactionUnit } from "../transaction-control/app-transaction.unit";
import { ProfileNeo4jMapper } from "./profile.neo4j.mapper";

@Injectable()
export class ProfileNeo4jRepository extends ProfileRepository {
  
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly mapper: ProfileNeo4jMapper
  ) { super() }

  async getByUserId(userId: string): Promise<Profile|null> {
    const query = `
      MATCH (p:Profile)-[:BELONGS_TO]->(u:User { id: $uid }) RETURN p
    `;
    const { records } = await this.neo4jService.read(query, { uid: userId }); 
    if (records.length === 0) return null;
    return this.mapper.toEntity(records[0].get('p'));
  }

  private async checkDataRels(userId: string, profileId: string) {
    const { records } = await this.neo4jService.read(`
      RETURN exists((:User {id: $uid})<-[:BELONGS_TO]-(:Profile)) as userHasProfile,
             exists((:Profile { id: $pid })) as profileExists;
    `, {
      uid: userId,
      pid: profileId
    })
    return {
      userHasProfile: records[0].get('userHasProfile'),
      profileExists: records[0].get('profileExists')
    }
  }

  async persist(tx: AppTransactionUnit, profile: Profile, metadata: IProfileMetadata): Promise<boolean> {
    const { userHasProfile, profileExists } = await this.checkDataRels(metadata.userId || '', profile.getId());
    if (profileExists) { 
      const query = `
        MATCH (p:Profile { id: $pid }) SET p += $props RETURN true as ok
      `;
      const props = {
        pid: profile.getId(),
        props: this.mapper.toNeo4j(profile)
      };
      const { records } = tx
        ? await tx.run('neo4j', query, props)
        : await this.neo4jService.write(query, props);
      return records[0].get('ok') as boolean;
    }
    else {
      if (userHasProfile)
        throw new OpertationFailedErr("You can't assign two profiles to one user");
      if (!metadata.userId)
        throw new OpertationFailedErr("You must provide a user ID when creating a new profile");
      const query = `CREATE (p:Profile $props)-[:BELONGS_TO]->(u:User {id: $uid}) RETURN true as ok`;
      const props = {
        props: this.mapper.toNeo4j(profile),
        uid: metadata.userId
      };
      const { records } = tx
        ? await tx.run('neo4j', query, props)
        : await this.neo4jService.write(query, props);
      return records[0].get('ok');
    }
  }

  instantiate(): Profile {
    return new Profile();
  }

} 