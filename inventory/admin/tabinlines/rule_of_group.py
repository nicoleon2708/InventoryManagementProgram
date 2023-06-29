from django.contrib import admin

from inventory.models.rule import Rule


class RuleOfGroup(admin.TabularInline):
    model = Rule
    fields = ["name", "source_location", "destination_location", "types_of_rule"]
