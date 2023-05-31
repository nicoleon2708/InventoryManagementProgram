from django.urls import path, include
from rest_framework import routers
from auth_app.api.auth_viewset import AuthViewSet
from auth_app.api.company_viewset import CompanyViewSet
from auth_app.api.partner_viewset import PartnerViewSet
from auth_app.api.reset_password_view import ResetPasswordView
from auth_app.api.email_verification_view import EmailVerificationView
from auth_app.api.recovery_password_view import RecoveryPasswordView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
app_name = "auth_app"

# from rest_framework_swagger.views import get_swagger_view

# schema_view = get_swagger_view(title='Pastebin API')

router = routers.DefaultRouter()
router.register("user", AuthViewSet, basename='auth')
router.register("company", CompanyViewSet, basename="company")
router.register("partner", PartnerViewSet, basename='partner')


urlpatterns = [
    path('email-verification/<token>/', EmailVerificationView.as_view(), name='email-verification'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='password-reset-confirm'),
    path('recovery-password/', RecoveryPasswordView.as_view(), name='recovery-password'),
    path('api/refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]   

urlpatterns += router.urls
