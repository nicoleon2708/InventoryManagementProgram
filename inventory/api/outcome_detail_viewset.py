from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from auth_app.permissions.is_admin_permission import IsAdminPermission
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from inventory.models.outcome_detail import OutcomeDetail
from inventory.serializers.outcome_detail_serializer import OutcomeDetailSerializer
from inventory.serializers.add_product_outcome_serializer import AddProductOutcomeSerializer
from inventory.serializers.remove_product_quantity_outcome_serializer import RemoveProductQuantityOutcomeSerializer


class OutcomeDetailViewSet(viewsets.ModelViewSet):
    serializer_class = OutcomeDetailSerializer
    permission_classes = [IsAdminPermission | IsOwnerPermission]

    def get_queryset(self):
        '''
            get outcome details belong to user's
            if user is superuser or admin, it will returns all the outcome details exist
        '''
        user = self.request.user
        if user.is_superuser and user.is_staff:
            return OutcomeDetail.objects.all()
        return OutcomeDetail.objects.filter(outcome__user=user)

    @action(methods=['POST'],
            url_path='add_product',
            detail=False,
            serializer_class=AddProductOutcomeSerializer)
    def add_product_outcome(self, request, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        serializer.add_product_outcome()
        data['message'] = 'Add outcome detail successful'
        data['outcome_detail'] = serializer.data
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )

    @action(methods=['POST'],
            url_path='remove_quantity',
            detail=True,
            serializer_class=RemoveProductQuantityOutcomeSerializer)
    def remove_product_quantity(self, request, pk=None, *args, **kwargs):
        data = {}
        serializer = self.get_serializer(data=request.data, context={'pk':pk})
        serializer.is_valid(raise_exception=True)
        serializer.remove_product_quantity()
        data['message'] = 'Remove quantity successful'
        return JsonResponse(
            data=data,
            status=status.HTTP_200_OK
        )
