from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from inventory.models.group_rule import GroupRule
from inventory.models.location import Location


class Rule(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)

    class TypeChoice(models.TextChoices):
        get_stock_directly = ("STRAIGHT", "Take From Stock")
        get_stock_or_pull_from_location = (
            "ANT_LC",
            "Take From Stock, If Unavailable, Trigger Another Rule",
        )

    types_of_rule = models.CharField(
        max_length=255,
        choices=TypeChoice.choices,
        default=TypeChoice.get_stock_directly,
    )

    destination_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="destination_location_rule",
    )

    source_location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="source_location_rule",
    )

    group = models.ForeignKey(
        GroupRule,
        on_delete=models.CASCADE,
        related_name="rules",
        blank=True,
        null=True,
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="rules",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "rule"
        verbose_name = "Rule"
        verbose_name_plural = "Rules"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"

    @classmethod
    def create(cls, values, user=None):
        return cls.objects.create(
            user=(user and user or None),
            name=values["name"],
            description=values["description"],
            types_of_rule=values["types_of_rule"],
            source_location=values["source_location"],
            destination_location=values["destination_location"],
            group=values["group"],
        )
