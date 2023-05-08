from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from inventory.models.user import CustomUser
from rest_framework.validators import ValidationError


class RegisterForm(UserCreationForm):
    username = forms.CharField(label="Username")
    email = forms.EmailField(label="Email")
    password1 = forms.CharField(label="Password")
    password2 = forms.CharField(label="Confirm password")

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'password1': forms.TextInput(attrs={'class': 'form-control'}),
            'password2': forms.TextInput(attrs={'class': 'form-control'})
        }

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise ValidationError(
                "Confirm password is not correct, try again!")


class CustomerUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email')
