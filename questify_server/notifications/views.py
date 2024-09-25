from rest_framework import viewsets, permissions, response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .models import Notification
from .serializers import NotificationSerializer, NotificationNumberSerializer

class NotificationViewSet(viewsets.GenericViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(receivers=self.request.user.pk)

    @extend_schema(
        responses=NotificationNumberSerializer
    )
    @action(detail=False, methods=['get'])
    def number(self, request, *args, **kwargs):
        # Custom action to get the number of unseen notifications
        count = self.get_queryset().filter(seen=False).count()
        return response.Response({'unseen_count': count})

    @extend_schema(
        description="Marks all unseen notifications as seen and returns an HTTP 200 status code to decalre success",
        responses=None,
        request=None
    )
    @action(detail=False, methods=['post'], url_path='mark-seen')
    def mark_seen(self, request, *args, **kwargs):
        # Custom action to mark all unseen notifications as seen
        self.get_queryset().filter(seen=False).update(seen=True)
        return response.Response({})