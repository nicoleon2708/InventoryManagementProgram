from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from inventory.models.user import CustomUser


class CustomerUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'company', 'date_joined']
