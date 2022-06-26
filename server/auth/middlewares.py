from auth.models import User
from .crypto import jwt_decode


def authenticate_user(token):
    user_uid = jwt_decode(token).get('uid')
    return User.nodes.get_or_none(uid=user_uid)

def authenticate_context(request):
    context = {
        'request': request,
        'user': None
    }
    auth_header: str = request.headers.get('Authorization')
    try:
        if auth_header:
            key, token = auth_header.split(' ')
            if key == 'JWT':
                context['user'] = authenticate_user(token)
    except: pass
    return context