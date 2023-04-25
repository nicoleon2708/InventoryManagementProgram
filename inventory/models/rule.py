from django.db import models
from . import group_rule


class Rule(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    group = models.OneToOneField(
        group_rule.GroupRule, on_delete=models.CASCADE)

    def __str__(self):
        return f"Rule({self.name})"
