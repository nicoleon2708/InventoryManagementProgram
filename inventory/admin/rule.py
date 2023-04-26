from django.contrib import admin
from inventory.models.rule import Rule


class RuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']


admin.site.register(Rule, RuleAdmin)
