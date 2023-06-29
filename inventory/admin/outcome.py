from django.contrib import admin

from inventory.admin.tabinlines.list_transfer_of_outcome import \
    ListTransferOfOutcome
from inventory.admin.tabinlines.outcome_detail_in_line import \
    OutcomeDetailInline
from inventory.models.outcome import Outcome


class OutcomeAdmin(admin.ModelAdmin):
    list_display = ["user", "partner", "total_price", "created_date", "status"]
    inlines = [OutcomeDetailInline, ListTransferOfOutcome]
