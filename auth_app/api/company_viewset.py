from inventory.models.company import Company
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from auth_app.serializers.company_serializer import CompanySerializer
from auth_app.serializers.user_serializer import UserSerializer
from rest_framework import status
from rest_framework.validators import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from auth_app.authentication import ExpiringTokenAuthentication
from rest_framework.decorators import action


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [ExpiringTokenAuthentication]
