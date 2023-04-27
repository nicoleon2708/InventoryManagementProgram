from django.db import models
from inventory.models.group_rule import GroupRule
from inventory.models.location import Location
from django.utils.translation import gettext_lazy as _


class Rule(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)

    class TypeChoice(models.TextChoices):
        get_stock_directly = (
            "STRAIGHT", "If location A of Warehouse A have, get straight")
        get_stock_or_pull_from_location = (
            "ANT_LC", "If location A don't have, get from location B")

    types_of_rule = models.CharField(
        max_length=255,
        choices=TypeChoice.choices,
        default=TypeChoice.get_stock_directly
    )

    group = models.ForeignKey(
        GroupRule,
        on_delete=models.SET_NULL,
        related_name='rules',
        blank=True,
        null=True,

    )

    class Meta:
        db_table = "rule"
        verbose_name = "Rule"
        verbose_name_plural = "Rules"

    def __str__(self):
        return f"Rule({self.name})"
