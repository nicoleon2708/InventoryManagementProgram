import jwt
from django.conf import settings
from rest_framework import serializers
from rest_framework.fields import empty

from auth_app.models.user import User
from inventory.exception import CustomBadRequest


class EmailVerificationSerializer(serializers.ModelSerializer):
    email_verification_token = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ("email_verification_token",)

    def validate(self, data):
        token = data["email_verification_token"]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(id=payload["user_id"])
        except jwt.ExpiredSignatureError:
            raise serializers.CustomBadRequest({"error": "Activation expired"})
        except jwt.exceptions.DecodeError:
            raise serializers.CustomBadRequest({"error": "Invalid token"})
        except User.DoesNotExist:
            raise serializers.CustomBadRequest({"error": "User not found"})

        if not user.is_verified:
            user.is_verified = True
            user.save()

        data["user"] = user

        return data
