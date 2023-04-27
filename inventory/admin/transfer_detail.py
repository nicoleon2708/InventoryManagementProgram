from inventory.models.transfer_detail import TransferDetail
from django.contrib import admin


class TransferDetailAdmin(admin.ModelAdmin):
    list_display = ['transfer', 'method',
                    'scheduled_time', 'note', 'transportation_type']


