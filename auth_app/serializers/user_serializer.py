from rest_framework import serializers
from auth_app.models.user import User
from inventory.models.company import Company


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
