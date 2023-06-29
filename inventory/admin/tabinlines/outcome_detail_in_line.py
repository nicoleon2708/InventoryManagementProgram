from django.contrib import admin

from inventory.models.outcome_detail import OutcomeDetail


class OutcomeDetailInline(admin.TabularInline):
    model = OutcomeDetail
    fields = ["product", "quantity", "price", "unit"]
