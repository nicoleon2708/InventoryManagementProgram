from django.contrib import admin
from inventory.admin.tabinlines.user_in_line import UserInLine
from inventory.models.company import Company

class CompanyAdmin(admin.ModelAdmin):

    list_display = ['name', 'contact_name', 'phone']

    inlines = [UserInLine]
