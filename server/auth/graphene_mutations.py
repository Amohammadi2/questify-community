import graphene
from graphene import ObjectType, InputObjectType, Mutation

from server.utils.contracts import GQLResultMixin
from .services import UserService

# Todo: login and verify token services

class LoginResult(ObjectType):
    token = graphene.String(required=True)

class LoginMutation(Mutation, GQLResultMixin):

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    data = graphene.Field(LoginResult, required=True)

    @staticmethod
    def mutate(root, info, username: str, password: str):
        return (UserService
                .get_auth_token(username=username, password=password)
                .to_gql_result())


class VerifyTokenMutation(Mutation):

    class Arguments:
        token = graphene.String(required=True)

    @staticmethod
    def mutate(root, info, token: str):
        return UserService.verify_auth_token(token=token).to_gql_result()