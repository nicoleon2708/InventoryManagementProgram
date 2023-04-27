from django.contrib import admin
from inventory.models.transfer import Transfer


class TransferAdmin(admin.ModelAdmin):
    list_display = ['user', 'outcome']
