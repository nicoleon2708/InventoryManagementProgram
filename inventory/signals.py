from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse

@receiver(post_save, sender=Warehouse)
def create_location(sender, instance, created, *args, **kwargs):
    # if warehouse instance create, a main location for that warehouse also be created
    if created:
        Location.objects.create(
            warehouse=instance,
            address=instance.address,
            postal_code = instance.postal_code,
            city = instance.city,
            district =  instance.district
        )
