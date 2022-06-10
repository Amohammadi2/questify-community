from neomodel import db, StructuredNode, StringProperty, RelationshipFrom, RelationshipTo
from auth.models import User
from posts.enums import PostSegmentType
from utils.contracts import ValidationError
from utils.helpers import connect_with_uid, getvals
from utils.mixins import UIDMixin


class Community(StructuredNode, UIDMixin):
    owner = RelationshipFrom('auth.models.User', 'OWNS')
    name = StringProperty(unique_index=True, required=True)


class Post(StructuredNode, UIDMixin):
    author_rel = RelationshipFrom('auth.models.User', 'AUTHORED')
    tags_rel = RelationshipTo('PostTag', 'TAGGED')
    segments_rel = RelationshipFrom('PostSegment', 'PART_OF')
    title = StringProperty(required=True)
    summery = StringProperty()

    @property
    def author(self):
        return self.author_rel.all()[0]

    @property
    def tags(self):
        return [
            tag_info[0] for tag_info in
            db.cypher_query(
                'MATCH (:Post {uid: $uid})-[:TAGGED]->(tag:PostTag) RETURN tag.name', { 'uid': self.uid }
            )[0]
        ]

    @property
    def segments(self):
        return self.segments_rel.all()

    @classmethod
    def new(cls, payload):
        with db.transaction:
            post = Post(**getvals(payload, ['title', 'summery'])).save()
            tags = payload.get('tags')
            if len(tags) < 1:
                raise ValidationError("no_tags", "You should specify at least one tag")
            for tag_name in tags:
                tag = PostTag.new(tag_name)
                tag.posts_rel.connect(post)
            for segment in payload.get('segments'):
                seg = PostSegment(**getvals(segment, ['content', 'type'])).save()
                seg.post_rel.connect(post)
            connect_with_uid(post.author_rel, User, payload['author'])
            return post


class PostSegment(StructuredNode, UIDMixin):
    post_rel = RelationshipTo('Post', 'PART_OF')
    content = StringProperty(required=True)
    type_str = StringProperty(choices={
        'TEXT': 'TEXT',
        'FILE': 'FILE',
        'IMAGE': 'IMAGE'
    }, required=True)

    segment_mapping = {
        PostSegmentType.TEXT: 'TEXT',
        PostSegmentType.FILE: 'FILE',
        PostSegmentType.IMAGE: 'IMAGE',
    }
    reversed_segment_mapping = { v: k for k, v in segment_mapping.items() }

    @property
    def type(self):
        return self.reversed_segment_mapping[self.type_str]

    @type.setter
    def type(self, value):
        self.type_str = self.segment_mapping[value]


class PostTag(StructuredNode, UIDMixin):
    posts_rel = RelationshipFrom('Post', 'TAGGED')
    name = StringProperty(unique_index=True)

    @classmethod
    def new(cls, tag_name):
        result = db.cypher_query("MERGE (pt:PostTag {name: $name}) RETURN pt", {'name': tag_name})
        return cls.inflate(result[0][0][0])