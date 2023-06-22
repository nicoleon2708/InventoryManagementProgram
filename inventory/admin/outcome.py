from django.contrib import admin
from inventory.models.outcome import Outcome
from inventory.admin.tabinlines.outcome_detail_in_line import OutcomeDetailInline


class OutcomeAdmin(admin.ModelAdmin):
    list_display = ['user', 'partner', 'total_price', 'created_date', 'status']
    inlines = [OutcomeDetailInline]
