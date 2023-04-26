from inventory.models.group_rule import GroupRule
from django.contrib import admin


class GroupRuleAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']


admin.site.register(GroupRule, GroupRuleAdmin)
