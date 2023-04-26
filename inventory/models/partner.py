from django.db import models


class Partner(models.Model):
    company_name = models.CharField(max_length=255, blank=True)
    contact_name = models.CharField(max_length=255, blank=True)
    contact_phone = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "partner"
        verbose_name = "Partner"
        verbose_name_plural = "Partners"

    def __str__(self):
        return f"Partner({self.company_name} - {self.contact_name})"
