from multiprocessing import context
from neomodel import config
from ariadne import make_executable_schema, load_schema_from_path, snake_case_fallback_resolvers
from ariadne.asgi import GraphQL
from starlette.middleware.cors import CORSMiddleware

from auth import auth_gqlmodule, authenticate_context
from posts import posts_gqlmodule

# Todo: use dynamic env vars instead
config.DATABASE_URL = 'bolt://neo4j:admin@localhost:7687'
type_defs = load_schema_from_path("./schema.graphql")

schema = make_executable_schema(
    type_defs,
    snake_case_fallback_resolvers,
    *auth_gqlmodule,
    *posts_gqlmodule,
)
app = CORSMiddleware(
    GraphQL(schema, context_value=authenticate_context, debug=True),
    allow_origins=["*"],
    allow_methods=["OPTION", "GET", "POST"]
)

if __name__ == '__main__':
    breakpoint()