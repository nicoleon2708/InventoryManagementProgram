from django.db import models


class GroupRule(models.Model):
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField(max_length=500, blank=True)

    class Meta:
        db_table = "group_rule"

    def __str__(self):
        return f"GroupRule({self.name})"
