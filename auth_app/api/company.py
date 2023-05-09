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
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from auth_app.authentication import ExpiringTokenAuthentication


class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [ExpiringTokenAuthentication]
    http_method_names = ['get', ]
    lookup_field = 'id'

    # def get_queryset(self):
    #     return Company.objects.filter(users=self.request.user.pk).all()

    def list(self, request):
        query_set = Company.objects.all()
        data = self.serializer_class(query_set, many=True).data
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )

    def retrieve(self, request, pk, *args, **kwargs):
        instance = self.get_object()
        return JsonResponse(
            data=self.serializer_class(instance).data,
            status=status.HTTP_200_OK
        )


class CreateCompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [ExpiringTokenAuthentication]
    http_method_names = ['post', ]

    def create(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            user = request.user
            serializer = self.serializer_class(
                data=request.data,
                context={
                    "user": user
                }
            )
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(
                    data=serializer.data,
                    status=status.HTTP_201_CREATED
                )
            else:
                return JsonResponse(
                    data=serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            raise ValidationError("User is not authenticated!")


class UpdateCompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [ExpiringTokenAuthentication]
    http_method_names = ['put', 'patch', ]

    def update(self, request, pk, *args, **kwargs):
        if self.request.user.is_authenticated:
            user = request.user
            company = self.get_object()
            serializer = self.serializer_class(
                instance=company, data=request.data,
                context={
                    "user": user
                },
                partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(
                    data=serializer.data,
                    status=status.HTTP_202_ACCEPTED
                )
            else:
                return JsonResponse(
                    data=serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            raise ValidationError("User is not authenticated!")


class DeleteCompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['delete', ]

    def destroy(self, request, pk, *args, **kwargs):
        instance = self.get_object()
        return super(DeleteCompanyViewSet, self).destroy(request, pk, *args, **kwargs)
