from ariadne import QueryType, EnumType
from .enums import UserRoles

query = QueryType()

role_enum = EnumType('Role', UserRoles)

@query.field("me")
def resolve_me(_, info):
    return info.context['user']