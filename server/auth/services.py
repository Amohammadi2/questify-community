from jwt import DecodeError
from utils.contracts import ServiceResult
from .models import User
from .crypto import jwt_decode, jwt_encode, pswd

# Todo: migrate to use `BaseService` class
# Adoption strategy:
#   - inehrit from the `BaseService`
#   - use instasnce methods instead of static methods
class UserService:

    @staticmethod
    def register_new_user(*, username: str, password: str, **kwargs) -> ServiceResult:
        """ Create a new username with a hashed password """
        new_user = User(
            username=username,
            password=pswd(password),
            **kwargs
        ).save()
        return ServiceResult(data=new_user)

    @staticmethod
    def get_auth_token(*, username: str, password: str) -> ServiceResult:
        user = User.nodes.get_or_none(username=username, password=pswd(password))
        if user is None:
            # Todo: COMPLETELY REFACTOR THE ERROR HANDLING PARADIGM
            # ServiceResult -> raise ServiceError
            return ServiceResult(
                err_code="wrong_credentials", err_message="Please enter valid credentials")
        jwt_payload = {
            'uid': user.uid,
            # Todo: add expiration date
        }
        jwt_token = jwt_encode(jwt_payload)
        return ServiceResult(data={'token': jwt_token})

    @staticmethod
    def verify_auth_token(*, token:str) -> ServiceResult:
        try:
            claims = jwt_decode(token)
        except DecodeError:
            return ServiceResult(err_code="invalid_token", err_message="Error while decoding the token")
        if User.nodes.get_or_none(uid=claims.get('uid')) is None:
            return ServiceResult(err_code="wrong_claims", err_message="No account mathces the token")
        return ServiceResult.ok_status()