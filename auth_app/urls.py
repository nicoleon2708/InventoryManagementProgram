from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from auth_app.api.auth_viewset import AuthViewSet

router = routers.DefaultRouter()
router.register("user", AuthViewSet, basename='auth')

app_name = "auth_app"
urlpatterns = [
]

urlpatterns += router.urls
