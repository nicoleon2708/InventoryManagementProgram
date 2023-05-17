from django.contrib import admin


class RoleAdmin(admin.ModelAdmin):
    list_display = ['type_of_roles']
