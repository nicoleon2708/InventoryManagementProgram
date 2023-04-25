from django.db import models

# Create Company Model


class Company(models.Model):
    name = models.CharField(max_length=200)
    contact_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)

    def __str__(self):
        return f"Company({self.name})"
