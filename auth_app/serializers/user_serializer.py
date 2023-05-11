from rest_framework import serializers
from auth_app.models.user import User
from rest_framework.validators import ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get(
            'email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance
