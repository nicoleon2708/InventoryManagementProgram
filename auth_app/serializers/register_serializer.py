from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from auth_app.models.role import Role
from auth_app.models.user import User
from auth_app.utils import send_mail


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "confirm_password",
            "company_name",
            "phone",
            "address",
            "postal_code",
            "city",
            "district",
        )
        extra_kwargs = {"password": {"write_only": "True"}}

    def send_email_verification(self, request, user):
        """
        this function send mail to user's email to
        get verification from user
        """
        user_data = User.objects.get(id=user.get("id"))
        domain = settings.FRONT_END
        activate_token = RefreshToken.for_user(user_data).access_token
        activate_link = f"http://{domain}/email-verification/{activate_token}/"
        # get activate_link, get method to the link to get the activate_token
        subject = "Activate your account"
        message = "Click the link below to verify your email! \n" + f"{activate_link}"

        recipient = user["email"]

        send_mail(subject, message, recipient)

    def validate_username(self, value):
        if User.objects.filter(username=value):
            raise ValidationError("This username is already exists!")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value):
            raise ValidationError("This email is already taken!")
        return value

    def validate_phone(self, value):
        if len(value) != 10:
            raise ValidationError("The digits of phone number is not valid!")
        return value

    def validate(self, data):
        username = data.get("username", None)
        if data["password"] != data["confirm_password"]:
            raise ValidationError("Confirm password must be match!")

        return data

    def create(self, validated_data):
        user = User.create(
            values=validated_data,
        )
        user.role = Role.objects.filter(type_of_roles=Role.TypeChoice.is_owner).first()
        user.set_password(validated_data["password"])
        user.save()
        return user
