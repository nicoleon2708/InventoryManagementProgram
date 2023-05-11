from django.contrib import admin
from auth_app.models.role import Role


class RoleAdmin(admin.ModelAdmin):
    list_display = ['name']
