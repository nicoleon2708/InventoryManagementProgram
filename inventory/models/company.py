from django.conf import settings
from django.db import models

# Create Company Model


class Company(models.Model):
    name = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=255, blank=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="company",
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "company"
        verbose_name = "company"
        verbose_name_plural = "companies"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"

    @classmethod
    def create(cls, values, user=None):
        return cls.objects.create(
            name=values["name"],
            first_name=values["first_name"],
            last_name=values["last_name"],
            phone=values["phone"],
            address=values["address"],
            postal_code=values["postal_code"],
            city=values["city"],
            district=values["district"],
            user=(user and user or None),
        )
