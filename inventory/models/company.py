from django.db import models

# Create Company Model


class Company(models.Model):
    name = models.CharField(max_length=100, blank=True)
    contact_name = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=200, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = "company"

    def __str__(self):
        return f"{self.name}"
