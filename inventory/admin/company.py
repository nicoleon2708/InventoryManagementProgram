from django.contrib import admin
from inventory.models.company import Company


class CompanyAdmin(admin.ModelAdmin):

    list_display = ['name', 'first_name', 'last_name', 'phone', 'user']
