from django.contrib import admin
from inventory.models.company import Company


class CompanyAdmin(admin.ModelAdmin):

    list_display = ['name', 'contact_name', 'phone', 'user']
