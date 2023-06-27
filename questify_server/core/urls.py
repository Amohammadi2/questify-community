from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from graphene_django.views import GraphQLView

from .views import AnswersViewset, QuestionsViewset, UsersViewset

router = DefaultRouter()
router.register('questions', QuestionsViewset, basename="questions")
router.register('answers', AnswersViewset, basename="answers")
router.register('users', UsersViewset, basename="users")

urlpatterns = [

    # Auth
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API Online Schema
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # GraphQL
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),

    # Questions
    *router.urls,

]