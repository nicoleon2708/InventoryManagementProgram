from inventory.models.outcome_detail import OutcomeDetail
from django.contrib import admin


class OutcomeDetailAdmin(admin.ModelAdmin):
    list_display = ['outcome', 'quantity', 'price', 'unit']
