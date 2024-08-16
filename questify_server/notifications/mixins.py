from core.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from asgiref.sync import sync_to_async
from urllib.parse import parse_qs

class WebsocketTokenAuthMixin:

    async def authenticate(self) -> User:
        params = parse_qs(self.scope['query_string'].decode())
        token = params.get('token', [None])[0]
        if token:
            try:
                jwt_auth = JWTAuthentication()
                validated_token = jwt_auth.get_validated_token(token)
                user = await sync_to_async(jwt_auth.get_user)(validated_token)
                breakpoint()
                return user
            except Exception as e:
                raise e
        else:
            raise Exception("Auth token was not provided in the query string parameters")
        
