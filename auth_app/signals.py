from django.db.models.signals import post_save
from django.dispatch import receiver
from auth_app.models.user import User
from inventory.models.company import Company
"""
    When the User model is saved, a signal is fired called
    register_company which creates a Company instance with a foreign key
    pointing to the instance of the user
"""


@receiver(post_save, sender=User)
def register_company(sender, instance, created, *args, **kwargs):
    # if user instance create, company also be created
    if created:
        Company.objects.create(
            user=instance,
            first_name=instance.first_name,
            last_name=instance.last_name,
            name=instance.company_name,
            phone=instance.phone,
            address=instance.address,
            postal_code=instance.postal_code,
            district=instance.district,
            city=instance.city)
