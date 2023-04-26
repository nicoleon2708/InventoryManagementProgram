from django.db import models


class GroupRule(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)

    class Meta:
        db_table = "group_rule"
        verbose_name = "group of rules"
        verbose_name_plural = "groups of rules"

    def __str__(self):
        return f"GroupRule({self.name})"
