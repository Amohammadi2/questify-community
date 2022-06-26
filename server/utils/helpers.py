from .contracts import ValidationError
from neomodel import RelationshipDefinition, StructuredNode

def getvals(data: dict, val_list: list, partial: bool = False) -> dict:
    """ Returns a dict containing the keys defined in `val_list` from data """
    if not partial:
        # check if all the values are present in the data
        provided_keys = { key for key in data.keys() }
        required_keys = { val for val in val_list }
        if not required_keys.issubset(provided_keys):
            raise ValidationError(
                code="invalid_payload",
                message="Invalid data, these keys must be supplied: {}".format(provided_keys.difference(required_keys)))
     # Pick up the data only if it is specified in the list
    return {
        key: value for key, value in data.items()
            if key in val_list
    }


def connect_with_uid(rel: RelationshipDefinition, model: StructuredNode, uid: str):
    """ Connects two nodes togher, using the uid of the target node """
    try:
        rel.connect(model.with_uid(uid))
    except model.DoesNotExist:
        raise ValidationError(
            code=f'{model.__name__.lower()}_not_found',
            message=f'{model.__name__} with uid {uid} does not exist'
        )


def source(field_name: str, one=False):
    def wrapper(self):
        return (f:=getattr(self, field_name)).all() if one == False else f.all()[0]
    return wrapper


def exclude(tpl, vals: tuple):
    return tuple(set(tpl).difference(set(vals)))


def check_flag(bitmap, flag):
    """ Check if the flag is included in the bitmap """
    return bitmap & flag > 0