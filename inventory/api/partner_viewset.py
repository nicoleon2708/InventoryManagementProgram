from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from inventory.serializers.partner_serializer import PartnerSerializer
from inventory.serializers.register_partner_serializer import RegisterPartnerSerializer
from inventory.serializers.update_partner_serializer import UpdatePartnerSerializer
from inventory.serializers.delete_partner_serializer import DeletePartnerSerializer
from auth_app.permissions.is_admin_permission import IsAdminPermission
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from inventory.models.partner import Partner


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [IsOwnerPermission | IsAdminPermission]

    def get_queryset(self):
        '''
            get partners belong to user's
            if user is superuser or admin, it will returns all the partners exist
        '''
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return Partner.objects.all()
        return Partner.objects.filter(user=user)

    @action(methods=['POST'],
            url_path='register',
            detail=False,
            serializer_class=RegisterPartnerSerializer)
    def register_partner(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.register_partner()
        data['message'] = 'Register partner successful'
        data['partner'] = serializer.data
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    
    @action(methods=['PUT'],
            url_path='update',
            detail=True,
            serializer_class=UpdatePartnerSerializer)
    def update_partner(self, request, pk=None, *args, **kwargs):
        data = {}
        pk = self.kwargs['pk']
        serializer = self.get_serializer(data=request.data, context={'pk': pk})
        serializer.is_valid(raise_exception=True)
        serializer.update_partner()
        data['message'] = 'Update successful'
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
    
    @action(methods=['DELETE'],
            url_path='delete',
            detail=True,
            serializer_class=DeletePartnerSerializer)
    def delete_partner(self, request, pk=None, *args, **kwargs):
        data = {}
        pk = self.kwargs['pk']
        serializer = self.get_serializer(data=request.data, context={'pk':pk})
        serializer.is_valid(raise_exception=True)
        serializer.delete_partner()
        data['message'] = 'Delete partner sucessful'
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )

