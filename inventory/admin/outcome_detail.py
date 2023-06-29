from django.contrib import admin

from inventory.models.outcome_detail import OutcomeDetail


class OutcomeDetailAdmin(admin.ModelAdmin):
    list_display = ["outcome", "quantity", "price", "unit"]
