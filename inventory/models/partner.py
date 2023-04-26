from django.db import models


class Partner(models.Model):
    company_name = models.CharField(max_length=100, blank=True)
    contact_name = models.CharField(max_length=100, blank=True)
    contact_phone = models.CharField(default=0, blank=True)
    address = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = "partner"

    def __str__(self):
        return f"Partner({self.company_name} - {self.contact_name})"
