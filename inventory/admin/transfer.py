from django.contrib import admin
from inventory.models.transfer import Transfer
from inventory.admin.tabinlines.transfer_detail_in_line import TransferDetailInLine


class TransferAdmin(admin.ModelAdmin):
    list_display = ['user', 'outcome']
    inlines = [TransferDetailInLine]
