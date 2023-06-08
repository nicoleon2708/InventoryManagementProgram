from django.contrib import admin
from inventory.models.rule import Rule

class RuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'types_of_rule', 'action', 'source_location', 'destination_location' , 'group']
