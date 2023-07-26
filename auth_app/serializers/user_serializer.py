from rest_framework import serializers

from auth_app.models.user import User
from inventory.models.company import Company


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return self.context["request"].build_absolute_uri(obj.image.url)

    class Meta:
        model = User
        fields = "__all__"
