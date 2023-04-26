from inventory.models.user import User
from django.contrib import admin


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'company', 'created_date']
    fields = ['username', 'password', 'company']


admin.site.register(User, UserAdmin)
