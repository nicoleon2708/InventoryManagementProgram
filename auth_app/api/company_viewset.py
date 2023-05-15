from inventory.models.company import Company
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from auth_app.serializers.company_serializer import CompanySerializer
from auth_app.serializers.register_company_serializer import RegisterCompanySerializer
from rest_framework import status
from rest_framework.validators import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission
from rest_framework.authentication import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from auth_app.authentication import ExpiringTokenAuthentication
from rest_framework.decorators import action, permission_classes, authentication_classes
from auth_app.serializers.user_serializer import UserSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    @authentication_classes([ExpiringTokenAuthentication])
    @permission_classes([IsAuthenticatedOrReadOnly])
    @action(methods=["POST"],
            detail=False,
            url_path="register",
            serializer_class=RegisterCompanySerializer)
    def register(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(
            data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['status'] = "Registration succesful"
        data['company'] = serializer.data
        return JsonResponse(
            data=serializer.data,
            status=status.HTTP_201_CREATED,
            safe=False
        )
