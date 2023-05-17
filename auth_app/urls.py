from django.urls import path, include
# from django.conf.urls import url as u
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from auth_app.api.auth_viewset import AuthViewSet
from auth_app.api.company_viewset import CompanyViewSet
from auth_app.api.partner_viewset import PartnerViewSet

# from rest_framework_swagger.views import get_swagger_view

# schema_view = get_swagger_view(title='Pastebin API')

router = routers.DefaultRouter()
router.register("user", AuthViewSet, basename='auth')
router.register("company", CompanyViewSet, basename="company")
router.register("partner", PartnerViewSet, basename='partner')

app_name = "auth_app"
urlpatterns = [
]

urlpatterns += router.urls
