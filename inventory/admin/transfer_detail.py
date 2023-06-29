from django.contrib import admin

from inventory.models.transfer_detail import TransferDetail


class TransferDetailAdmin(admin.ModelAdmin):
    list_display = [
        "transfer",
        "product",
        "quantity",
        "source_location",
        "destination_location",
        "status",
    ]

    def source_location(self, obj):
        return obj.transfer.source_location

    def destination_location(self, obj):
        return obj.transfer.destination_location
