from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from auth_app.models.user import User


class LogoutSerializer(serializers.ModelSerializer):
    refresh = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ["refresh"]

    default_error_messages = {"bad_token": {"Token is expired or invalid"}}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("Bad token")
