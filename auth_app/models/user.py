from datetime import timezone
from typing import Iterable, Optional

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from auth_app.models.role import Role
from inventory.models.company import Company


class User(AbstractUser):
    def upload_to(instance, filename):
        return "images/user_image/{filename}".format(filename=filename)

    image = models.ImageField(
        upload_to=upload_to,
        max_length=200,
        blank=True,
        null=True,
        default="images/user_image/default.png",
    )
    role = models.ForeignKey(
        Role, related_name="users", on_delete=models.DO_NOTHING, blank=True, null=True
    )

    is_verified = models.BooleanField(default=False)

    company_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"User({self.username})"

    @classmethod
    def create(cls, values):
        return cls.objects.create(
            username=values["username"],
            email=values["email"],
            first_name=values["first_name"],
            last_name=values["last_name"],
            company_name=values["company_name"],
            phone=values["phone"],
            address=values["address"],
            postal_code=values["postal_code"],
            city=values["city"],
            district=values["district"],
        )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.is_superuser:
            company = Company.objects.get(user=self)
            company.first_name = self.first_name
            company.last_name = self.last_name
            company.address = self.address
            company.postal_code = self.postal_code
            company.city = self.city
            company.district = self.district
            company.phone = self.phone
            company.save()
