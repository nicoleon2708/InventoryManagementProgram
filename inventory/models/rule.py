from django.db import models
from inventory.models.group_rule import GroupRule
from inventory.models.location import Location
from django.utils.translation import gettext_lazy as _


class Rule(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)

    class TypeChoice(models.TextChoices):
        get_stock_directly = (
            "STRAIGHT", "Take From Stock")
        get_stock_or_pull_from_location = (
            "ANT_LC", "Take From Stock, If Unavailable, Trigger Another Rule")

    types_of_rule = models.CharField(
        max_length=255,
        choices=TypeChoice.choices,
        default=TypeChoice.get_stock_directly
    )

    class ActionType(models.TextChoices):
        pull_from = (
            "PULL", "Pull From"
        )
        push_to = (
            "PUSH", 'Push To'
        )
        push_and_pull = (
            'PUSH_AND_PULL', 'Push and Pull'
        )

    action = models.CharField(
        max_length=255,
        choices=ActionType.choices,
        default=ActionType.pull_from
    )

    destination_location = models.ForeignKey(
        Location,
        on_delete = models.CASCADE,
        null=True,
        blank=True,
        related_name='destination_location_rule'
    )

    source_location = models.ForeignKey(
        Location,
        on_delete = models.CASCADE,
        null=True,
        blank=True,
        related_name='source_location_rule'
    )

    group = models.ForeignKey(
        GroupRule,
        on_delete=models.CASCADE,
        related_name='rules',
        blank=True,
        null=True,

    )

    class Meta:
        db_table = "rule"
        verbose_name = "Rule"
        verbose_name_plural = "Rules"

    def __str__(self):
        return f"{self.name}"
