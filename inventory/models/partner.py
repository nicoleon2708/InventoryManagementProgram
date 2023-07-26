from django.conf import settings
from django.db import models


class Partner(models.Model):
    company_name = models.CharField(max_length=255, blank=True)
    contact_name = models.CharField(max_length=255, blank=True)
    contact_phone = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=255, blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="partners",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "partner"
        verbose_name = "Partner"
        verbose_name_plural = "Partners"

    def __str__(self):
        return f"Partner({self.company_name} - {self.contact_name})"

    @classmethod
    def create(cls, values, user=None):
        return cls.objects.create(
            company_name=values["company_name"],
            contact_name=values["contact_name"],
            contact_phone=values["contact_phone"],
            address=values["address"],
            postal_code=values["postal_code"],
            city=values["city"],
            district=values["district"],
            user=(user and user or None),
        )
