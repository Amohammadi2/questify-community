import { Injectable } from "@nestjs/common";
import { School } from "src/domain/entities/school/school.entity";
import { Neo4jMapper } from "../shared/neo4j.mapper.interface";
import { SchoolNeo4j } from "./school.neo4j.model";

@Injectable()
export class SchoolNeo4jMapper implements Neo4jMapper<School, SchoolNeo4j> {

  toNeo4j(entity: School): SchoolNeo4j {
    const { name, websiteAddress, description, id } = entity.getFields();
    return {
      name,
      websiteAddress,
      description,
      id
    }
  }

  toEntity(neo4j: SchoolNeo4j): School {
    return new School().restore({
      name: neo4j.name,
      websiteAddress: neo4j.websiteAddress,
      description: neo4j.description,
      id: neo4j.id
    })
  }

}