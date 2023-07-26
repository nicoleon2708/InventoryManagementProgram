from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth_app.models.user import User


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)
    new_password = serializers.CharField(max_length=255, write_only=True)
    conf_new_password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "password",
            "new_password",
            "conf_new_password",
        )
        extra_kwargs = {"password": {"write_only": "True"}}

    def validate(self, data):
        pk = self.context["pk"]
        password = data.get("password", None)
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            user = None
        if user:
            if not check_password(password, user.password):
                raise ValidationError(
                    "Password of this user is not correct, try again!"
                )
        if data["new_password"] != data["conf_new_password"]:
            raise ValidationError("Confirm password must be match!")
        data["user"] = user
        return data

    def create(self, validated_data):
        return super().create(**validated_data)

    def change_user_password(self):
        instance = self.validated_data["user"]
        instance.set_password(self.validated_data["new_password"])
        instance.save()
        return instance
