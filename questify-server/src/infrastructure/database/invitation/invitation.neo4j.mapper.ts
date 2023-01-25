import { Injectable } from "@nestjs/common";
import { Invitation } from "src/domain/entities/invitation/invitation.entity";
import { Neo4jMapper } from "../shared/neo4j.mapper.interface";
import { Neo4jDateTimeMapper } from "../utils/neo4j-date";
import { InvitationNeo4j } from "./invitation.neo4j.model";


@Injectable()
export class InvitationNeo4jMapper implements Neo4jMapper<Invitation, InvitationNeo4j> {
  
  constructor(
    private readonly datetimeMapper: Neo4jDateTimeMapper
  ) {}

  toNeo4j(entity: Invitation): InvitationNeo4j {
    const { code, expirationDate, id } = entity.getFields();
    return {
      code,
      expirationDate: this.datetimeMapper.toNeo4jDateTime(expirationDate),
      id
    }
  }
  
  toEntity({ code, expirationDate, id }: InvitationNeo4j): Invitation {
    return new Invitation().restore({
      code, expirationDate: this.datetimeMapper.toNativeDatetime(expirationDate), id
    })
  }

}