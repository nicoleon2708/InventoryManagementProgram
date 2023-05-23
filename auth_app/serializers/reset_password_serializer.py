from rest_framework import serializers
from auth_app.models.user import User
from rest_framework.validators import ValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


class ResetPasswordSeriallizer(serializers.ModelSerializer):

    new_password = serializers.CharField(max_length=255, write_only=True)
    conf_new_password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields= ['new_password', 'conf_new_password']        

    def validate(self, data):
        uidb64 = self.context.get('kwargs').get('uidb64')
        token = self.context.get('kwargs').get('token')
        new_password = data.get('new_password')
        if data['new_password'] != data['conf_new_password']:
            raise ValidationError("Confirm new password is not match!")
        
        id = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=id)
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise ValidationError("The reset link is invalid")
        if not user:
            raise ValidationError("This user is not exist!")

        data['user'] = user
        data['new_password'] = new_password

        return data
    
    def reset_password(self):
        password = self.validated_data['new_password']
        user = self.validated_data['user']
        if user.is_verified:
            user.set_password(password)
            user.save()
