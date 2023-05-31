from inventory.models.partner import Partner
from django.http import JsonResponse
from rest_framework import viewsets
from auth_app.serializers.partner_serializer import PartnerSerializer
from rest_framework import status
from rest_framework.decorators import action
from auth_app.serializers.register_partner_serializer import RegisterPartnerSerializer
from auth_app.permissions.is_admin_permission import IsAdminPermission
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
