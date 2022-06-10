from .helpers import check_flag, getvals

class RMode():
    CONNECT = 0b0001
    CREATE  = 0b0010
    SINGLE  = 0b0100
    MANY    = 0b1000


class RepoMeta(type):

    def __new__(cls, name, bases, dct):
        repocls = super().__new__(cls, name, bases, dct)
        cls.populate_fields(repocls)
        cls.populate_subrepos(repocls)
        return repocls

    def populate_fields(cls, repocls):
        repocls.create_fields = (
            repocls.node_fields 
                if repocls.create_fields is None 
                else repocls.create_fields
        )

        repocls.update_fields = (
            repocls.node_fields
                if repocls.update_fields is None
                else repocls.update_fields
        )
    
    def populate_subrepos(self, repocls):
        repocls.subrepos = {
            prop_name: (prop_val:=getattr(repocls, prop_name)) 
                for prop_name in dir(repocls) if isinstance(prop_val, SubRepo)
        }
        

class BaseRepo(metaclass=RepoMeta):

    Model = None
    
    node_fields = tuple()
    create_fields: tuple = None
    update_fields: tuple = None

    base_perm = lambda u: True
    has_read_perm = lambda u,obj=None: True
    has_change_perm = lambda u,obj: True
    has_create_perm = lambda u: True
    has_update_perm = lambda u,obj: True
    has_remove_perm = lambda u,obj: True

    subrepos: dict[str, 'SubRepo'] = {}

    @classmethod
    def create(cls, payload):
        node = cls.Model(**getvals(payload, cls.create_fields)).save()
        for name, subrepo in cls.subrepos.items():
            edge = getattr(node, name)
            subrepo.attach(edge, payload.get(name))
        return node



class SubRepo:

    def __init__(self, repo, mode= RMode.CONNECT | RMode.SINGLE, lookup_field='uid'):
        self.repo = repo
        self.mode = mode
        self.lookup_field = lookup_field

    def attach(self, edge, payload):
        if check_flag(self.mode, RMode.SINGLE):
            if check_flag(self.mode, RMode.CONNECT):
                target_node = self.repo.get(**{self.lookup_field: payload})
            else:
                target_node = self.repo.create(payload)
            edge.connect(target_node)
        elif check_flag(self.mode, RMode.Many):
            if check_flag(self.mode, RMode.CONNECT):
                target_nodes = self.repo.filter(uid__in=payload)
            else: # CREATE THEM
                target_nodes = self.repo.create_batch(payload)
            for tnode in target_nodes:
                edge.connect(tnode)
