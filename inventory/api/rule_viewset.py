from rest_framework import viewsets, status
from django.http import JsonResponse
from rest_framework.decorators import action
from inventory.models.rule import Rule
from inventory.serializers.rule_serializer import RuleSerializer
from inventory.serializers.set_up_rule_stock_serializer import SetUpRuleSerializer
from auth_app.permissions.is_owner_permission import IsOwnerPermission
from auth_app.permissions.is_admin_permission import IsAdminPermission


class RuleViewSet(viewsets.ModelViewSet):
    serializer_class = RuleSerializer
    queryset = Rule.objects.all()
    permission_classes = [IsAdminPermission | IsOwnerPermission]

    @action(methods=['POST'],
            url_path='set_up',
            detail=False,
            serializer_class=SetUpRuleSerializer)
    def set_up_rule(self, request, *args, **kwargs):
        serializer= self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(
            data=serializer.data,
            status=status.HTTP_200_OK
        )
    
    
