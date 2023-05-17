from inventory.models.partner import Partner
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from auth_app.serializers.partner_serializer import PartnerSerializer
from rest_framework import status
from rest_framework.validators import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from auth_app.authentication import ExpiringTokenAuthentication
from rest_framework.decorators import action
from auth_app.serializers.register_partner_serializer import RegisterPartnerSerializer


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

    @action(methods=['POST'],
            detail=False,
            url_path='register',
            serializer_class=RegisterPartnerSerializer)
    def register(self, request, *args, **kwargs):
        partner_data = request.data
        data = {}
        serializer = self.get_serializer(data=partner_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['status'] = "Registration succesful"
        data['partner'] = serializer.data
        return JsonResponse(
            data=serializer.data,
            status=status.HTTP_201_CREATED,
            safe=False
        )
