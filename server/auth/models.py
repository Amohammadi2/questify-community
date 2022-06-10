from tokenize import String
from neomodel import (
    StructuredNode,
    StringProperty,
    UniqueIdProperty,
    RelationshipTo
)
from .enums import UserRoles


class User(StructuredNode):
    uid = UniqueIdProperty()
    # Authenetication credentials
    username = StringProperty(unique_index=True, required=True)
    password = StringProperty(required=True)
    role_str = StringProperty(choices={
        'STUDENT': 'STUDENT',
        'TEACHER': 'TEACHER',
        'MANAGER': 'MANAGER'
    })
    
    # Personal information (optional)
    first_name = StringProperty()
    last_name = StringProperty()
    email = StringProperty()

    owned_communites = RelationshipTo('posts.models.Community', 'OWNS')
    posts_rel = RelationshipTo('posts.models.Post', 'AUTHORED')

    @property
    def role(self):
        return getattr(UserRoles, self.role_str)

    @property
    def posts(self):
        return self.posts_rel.all()

    @classmethod
    def with_uid(cls, uid):
        return cls.nodes.get(uid=uid)
