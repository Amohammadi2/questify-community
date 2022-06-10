from ariadne import MutationType
from auth.services import UserService


mutation = MutationType()

@mutation.field("login")
def resolve_login(_, info, username: str, password: str):
    return (UserService
           .get_auth_token(username=username, password=password)
           .to_gql_result())

@mutation.field("verifyToken")
def resolve_verify_token(_, info, token: str) -> bool:
    return UserService.verify_auth_token(token=token).to_gql_result()

