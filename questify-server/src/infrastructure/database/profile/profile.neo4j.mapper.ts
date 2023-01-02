import { Profile } from "src/domain/entities/profile/profile.entity";
import { EmailAddress } from "src/domain/vos/email-address/email-address.vo";
import { Neo4jMapper } from "../shared/neo4j.mapper.interface";
import { ProfileNeo4j } from "./profile.neo4j.model";

export class ProfileNeo4jMapper implements Neo4jMapper<Profile, ProfileNeo4j> {
  
  toNeo4j(entity: Profile): ProfileNeo4j {
    const { bio, email, nickname, phoneNumber} = entity.getFields();
    return {
      email: email.getValue(),
      bio,
      nickname,
      phoneNumber
    };
  }

  toEntity(neo4j: ProfileNeo4j): Profile {
    return new Profile().restore({
      bio: neo4j.bio,
      email: new EmailAddress().init(neo4j.email),
      nickname: neo4j.nickname,
      phoneNumber: neo4j.phoneNumber
    })
  }

}