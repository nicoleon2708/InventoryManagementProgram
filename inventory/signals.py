from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from inventory.models.location import Location
from inventory.models.warehouse import Warehouse
from inventory.models.partner import Partner
from inventory.models.outcome import Outcome
from inventory.models.transfer import Transfer
from notifications.models import Notification
from notifications.services import NotificationService
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json


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


@receiver(post_save, sender=Outcome)
def send_outcome_noti_to_user(sender, instance, created, *args, **kwargs):
    # if a outcome is created, a noti about it will be send to user
    if created:
        user = instance.user
        notification = Notification.objects.create(
            user=user,
            message=f'Order OC{instance.id} has been created successfully'
        )
        NotificationService.send_notification(notification)


@receiver(post_save, sender=Transfer)
def send_transfer_noti_to_user(sender, instance, created, *args, **kwargs):
    # if a transfer is created, a noti about it will be send to user
    if created:
        user = instance.user
        notification = Notification.objects.create(
            user=user,
            message=f'Transfer TF{instance.id} has been created successfully'
        )
        NotificationService.send_notification(notification)
