from dataclasses import dataclass
from functools import wraps
import typing

import graphene


@dataclass
class GQLError:
    message: str = None
    code: str = None


@dataclass
class GQLResult:
    """ Common data format for the graphql resolvers """

    ok: bool
    error: GQLError
    data: 'typing.any'


class GQLErrorV2:
    message = graphene.String()
    code = graphene.String(required=True)

class GQLResultMixin:
    ok = graphene.Boolean(required=True)
    error = graphene.Field(GQLErrorV2)

@dataclass
class ServiceResult:
    """ Common data format between services and the graphql Gateway """

    data: 'typing.Any' = None
    err_message: str = None
    err_code: str = None

    def to_gql_result(self) -> GQLResult:
        # Todo: extract this functionality into an external function 
        # that can convert service data into the right mutation
        return GQLResult(
            ok = self.ok,
            error = GQLError(code=self.err_code,message=self.err_message),
            data = self.data
        )

    @property
    def ok(self) -> bool:
        return True if not self.err_code else False

    @staticmethod
    def ok_status():
        """ Service OK Status 
        
        NOTE: Use this for binary operations where the results can be
        communicated through either `OK` or `not OK` status and there's
        no data to be returned from the service
        """
        return ServiceResult()


class ServiceError(Exception):
    """ Standard error report format from services """
    
    def __init__(self, code: str, message: str, *args: object) -> None:
        super().__init__(*args)
        self.code = code
        self.message = message


class BaseService:
    """ The base service class
    
    All services across the app should inherit from this base
    class. It provides automatic error report mechanisms and
    common authorization methods like `assert_authenticated` and etc..
    """

    def __init__(self, user=None) -> None:
        self.user = user

    def _exchndl(self, fn, *args, **kwargs):
        """ Decorates service methods with exception handler 
        
        This way, we can convert `ServiceError` exceptions into
        `ServiceResult` objects containing the error details
        """
        try:
            return fn(*args, **kwargs)
        except ServiceError as err:
            return ServiceResult(
                err_code=err.code,
                err_message=err.message
            )

    def is_authenticated(self):
        return self.user is not None

    def assert_authenticated(self):
        if not self.is_authenticated():
            raise ServiceError(
                code="not_authenticated",
                message="You are not authenticated, please login or sing up"
            )


def service_method(fn):
    """ Binds exception handler to service methods """
    @wraps(fn)
    def wrapper(self: BaseService, *args, **kwargs) -> ServiceResult:
        return self._exchndl(fn, self, *args, **kwargs)
    return wrapper

# Todo:(#baseexc) Create a `BaseAppExcpetion` which includes the error code and message


class ValidationError(Exception):
    """ The base exception class for all validation errors """
    def __init__(self, code: str, message: str, *args: object) -> None:
        super().__init__(code, message, *args)
        self.code = code
        self.message = message