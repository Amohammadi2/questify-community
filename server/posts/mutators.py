from ariadne import MutationType, EnumType
from .payloads import PostSegmentType
from .services import PostService

mutation = MutationType()

PostSegmentTypeEnum = EnumType('PostSegmentType', PostSegmentType)

@mutation.field('createPost')
def create_post_resolver(_, info, input):
    return (PostService(user=info.context['user'])
            .create_post(payload=input)
            .to_gql_result())