from django.contrib import admin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest

from inventory.models.transfer import Transfer


class ListTransferOfOutcome(admin.TabularInline):
    model = Transfer
    fields = ["source_location", "destination_location"]
