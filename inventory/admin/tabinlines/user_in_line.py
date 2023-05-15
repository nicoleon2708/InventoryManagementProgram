from django.contrib import admin
from auth_app.models.user import User


class UserInLine(admin.TabularInline):
    model = User
    fields = ['username']
