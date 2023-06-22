from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse
from inventory.models.partner import Partner
from inventory.models.outcome import Outcome
from inventory.services.transfer_service import TransferService
from inventory.services.outcome_service import OutcomeService


@receiver(post_save, sender=Warehouse)
def create_location(sender, instance, created, *args, **kwargs):
    # if warehouse instance create, a main location for that warehouse also be created
    if created:
        Location.objects.create(
            name=instance.name+'/MainLocation',
            warehouse=instance,
            address=instance.address,
            postal_code = instance.postal_code,
            city = instance.city,
            district =  instance.district,
        )


@receiver(post_save, sender=Partner)
def create_partner_location(sender, instance, created, *args, **kwargs):
    # if a partner instance create, a partner type location will also be created
    if created:
        Location.objects.create(
            name='Location/'+instance.company_name,
            address=instance.address,
            postal_code=instance.postal_code,
            city=instance.city,
            district=instance.district,
            partner=instance
        )


@receiver(post_save, sender=Warehouse)
def create_external_outcome(sender, instance, created, *args, **kwargs):
    # if a warehouse is created, a external outcome will also be created
    if created:
        Location.objects.create(
            name=instance.name+'/External Outcome',
            warehouse=instance
        )
