from django.urls import path, include
from auth_app.api.user import UserViewSet, RegisterUserViewSet, CustomAuthTokenLogin
from auth_app.api.company import CompanyViewSet
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'register', RegisterUserViewSet, basename='register')

app_name = "auth_app"

urlpatterns = [
    # authentication user
    path('', include(router.urls)),
    path('login/', CustomAuthTokenLogin.as_view(), name="login"),
]
