from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth_app.models.user import User


class UpdateUserInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "company_name",
            "phone",
            "city",
            "district",
            "address",
            "image",
        )
        extra_kwargs = {"password": {"write_only": "True"}}

    def validate_phone(self, value):
        if len(value) != 10:
            raise ValidationError("The digits of phone number is not valid!")
        return value

    def validate(self, data):
        pk = self.context["pk"]
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            raise ValidationError("This user is not exist!")
        data["user"] = user
        return data

    def create(self, validated_data):
        return super().create(**validated_data)

    def update_user_information(self):
        instance = self.validated_data["user"]
        instance.first_name = self.validated_data.get("first_name", instance.first_name)
        instance.last_name = self.validated_data.get("last_name", instance.last_name)
        instance.company_name = self.validated_data.get(
            "company_name", instance.company_name
        )
        instance.phone = self.validated_data.get("phone", instance.phone)
        instance.image = self.validated_data.get("image", instance.image)
        instance.city = self.validated_data.get("city", instance.city)
        instance.district = self.validated_data.get("district", instance.district)
        instance.postal_code = self.validated_data.get(
            "postal_code", instance.postal_code
        )
        instance.address = self.validated_data.get("address", instance.address)
        instance.save()
        return instance
