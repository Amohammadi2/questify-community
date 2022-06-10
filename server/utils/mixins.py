from neomodel import UniqueIdProperty


class UIDMixin:
    """ Provide a UID field on any given structured node """
    uid = UniqueIdProperty()

    def with_uid(self, uid: str):
        """ Returns a node, given the specified UID """
        return self.nodes.get(uid=uid)