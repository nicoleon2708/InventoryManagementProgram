from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from inventory.forms.user import RegisterForm, CustomerUserChangeForm
from inventory.models.user import CustomUser


class CustomerUserAdmin(UserAdmin):
    add_form = RegisterForm
    form = CustomerUserChangeForm
    model = CustomUser
    list_display = ['username', 'company', 'date_joined']
