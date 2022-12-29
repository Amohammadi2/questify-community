export interface Neo4jMapper <E, N> {
  toNeo4j(entity: E): N;
  toEntity(neo4j: N): E;
}