from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from auth_app.models.user import User


class CustomerUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'company', 'date_joined']
