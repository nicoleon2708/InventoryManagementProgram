from django.db import models


class Partner(models.Model):
    company_name = models.CharField(max_length=100)
    contact_name = models.CharField(max_length=100)
    contact_phone = models.CharField(default=0)
    address = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)

    def __str__(self):
        return f"Partner({self.company_name} - {self.contact_name})"
