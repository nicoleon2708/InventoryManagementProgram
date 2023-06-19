# Generated by Django 4.2 on 2023-06-08 03:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0029_transferdetail_destination_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transferdetail',
            name='product',
        ),
        migrations.AddField(
            model_name='transferdetail',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transfer_detail', to='inventory.product'),
        ),
    ]
