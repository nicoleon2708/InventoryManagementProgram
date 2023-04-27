from django.contrib import admin
from inventory.models.company import Company
from inventory.models.user import User
from inventory.admin.tabinlines.user_in_line import UserInLine


class CompanyAdmin(admin.ModelAdmin):
    fields = ['name', 'contact_name', 'phone',
              'address', 'postal_code', 'city']

    list_display = ['name', 'contact_name', 'phone']

    inlines = [UserInLine]
