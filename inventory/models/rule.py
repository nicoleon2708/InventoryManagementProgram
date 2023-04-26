from django.db import models
from inventory.models.group_rule import GroupRule


class Rule(models.Model):
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField(max_length=500, blank=True)
    group = models.ForeignKey(
        GroupRule,
        on_delete=models.CASCADE,
        related_name='rules',
        blank=True,
        null=True
    )

    class Meta:
        db_table = "rule"

    def __str__(self):
        return f"Rule({self.name})"
