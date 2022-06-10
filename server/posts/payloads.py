from dataclasses import dataclass
from typing import List
from .enums import PostSegmentType

@dataclass
class PostSegmentPayload:
    content: str
    type: PostSegmentType


@dataclass
class PostPayload:
    title: str
    summery: str
    author: int
    segments: List[PostSegmentPayload]
