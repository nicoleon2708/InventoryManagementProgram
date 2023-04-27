from django.contrib import admin
from inventory.models.outcome import Outcome


class OutcomeAdmin(admin.ModelAdmin):
    list_display = ['user', 'partner', 'total_price', 'created_date', 'status']
