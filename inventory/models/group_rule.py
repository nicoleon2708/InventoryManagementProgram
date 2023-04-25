from django.db import models


class GroupRule(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)

    def __str__(self):
        return f"GroupRule({self.name})"
