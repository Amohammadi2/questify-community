import graphene
from graphene import InputObjectType, ObjectType, Mutation
from .services import PostService

str_req = lambda: graphene.String(required=True)
list_req = lambda of_type: graphene.List(of_type, required=True)

class CreatePostInput(InputObjectType):
    title = str_req()
    summery = str_req()
    content = str_req()
    tags = list_req(str_req())

class CreatePostMutation(Mutation):

    class Arguments:
        input = CreatePostInput(required=True)

    @staticmethod
    def mutate(root, info, input):
        PostService(user=info.context['user']).create_post(input)