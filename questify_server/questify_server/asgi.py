"""
ASGI config for questify_server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
import channels, django
from notifications.consumers import NotificationConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'questify_server.settings')

application = channels.routing.ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": channels.routing.URLRouter([
        django.urls.path("api/v1/notifications/", NotificationConsumer.as_asgi()),
    ])
})

