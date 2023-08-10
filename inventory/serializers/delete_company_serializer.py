from rest_framework import serializers
from rest_framework.validators import ValidationError

from inventory.exception import CustomBadRequest
from inventory.models.company import Company


class DeleteCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            company = Company.objects.get(id=pk)
        except Company.DoesNotExist:
            raise CustomBadRequest("This company does not exist!")
        data["company"] = company
        return data

    def delete_company(self):
        company = self.validated_data["company"]
        company.delete()
