from rest_framework import serializers
from rest_framework.validators import ValidationError

from auth_app.models.user import User


class UploadProfilePictureSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = User
        fields = "__all__"

    def validate(self, data):
        pk = self.context["pk"]
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            raise ValidationError("This user is not created yet!")
        data["user"] = user
        return data

    def upload_profile_picture(self):
        user = self.validated_data["user"]
        user.image = self.validated_data["image"]
        user.save()
