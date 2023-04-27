from django.contrib import admin
from inventory.models.user import CustomUser


class UserInLine(admin.TabularInline):
    model = CustomUser
    fields = ['username']
    readonly_fields = ['username']
