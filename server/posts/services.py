from .models import Post
from utils.contracts import (
    ServiceError,
    ServiceResult,
    BaseService,
    ValidationError,
    service_method
)

class PostService(BaseService):

    @service_method
    def create_post(self, *, payload: dict) -> ServiceResult:
        self.assert_authenticated()
        try:
            new_post = Post.new(payload)
        except ValidationError as e:
            raise ServiceError(
                code=e.code,
                message=e.message
            )
        return ServiceResult(data=new_post)

"""
@service_method(permissions=[is_authorized])
def create_post(post_payload):
    return PostRepo.create(post_payload)

@service_method(permissions=[is_authorized])
def edit_post(post_payload):
    reutrn PostRepo.update(post_payload)

@service_method(permissions=[is_authorized, ])
def delete_post(uid):
    return PostRepo.remove(uid=uid)


class PostService(RepoCRUD):
    repo = PostRepo
    permissions = {
        'global': is_authenticated,
        'read': lambda ...
        'change': PostPerms.can_read,
        ...
    }
"""