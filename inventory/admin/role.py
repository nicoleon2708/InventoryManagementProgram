from django.contrib import admin
from inventory.models.role import Role


class RoleAdmin(admin.ModelAdmin):
    list_display = ['name']


admin.site.register(Role, RoleAdmin)
