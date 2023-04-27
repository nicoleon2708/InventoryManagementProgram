from django.contrib import admin
from inventory.models.partner import Partner


class PartnerAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'contact_name', 'contact_phone']
