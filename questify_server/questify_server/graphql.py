import graphene
from core.graphql import CoreQueryRoot
from notifications.graphql import NotificationsQueryRoot

class Query(NotificationsQueryRoot, CoreQueryRoot):
    ...

schema = graphene.Schema(
    query=Query
)