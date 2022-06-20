import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
  type Movie {
    title: String
    actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
  }

  type Actor {
    name: String
    movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
  }
`;

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "admin")
);

const neoSchema = new Neo4jGraphQL({
  typeDefs, driver
});

neoSchema.getSchema().then((schema: any) => {
  const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          endpoint: "/graphql",
        })
      ]
  });

  server.listen().then(({ url }: any) => {
      console.log(`🚀 Server ready at ${url}`);
  });
})