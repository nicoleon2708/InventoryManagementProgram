from collections.abc import Iterator
from typing import Any

from django.contrib import admin
from django.http.request import HttpRequest

from inventory.admin.tabinlines.transfer_detail_in_line import \
    TransferDetailInLine
from inventory.models.transfer import Transfer


class TransferAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "outcome",
        "source_location",
        "destination_location",
        "transfer_detail_count",
    ]
    inlines = [TransferDetailInLine]

    def transfer_detail_count(self, obj):
        return obj.transfer_detail.filter(transfer=obj).count()
