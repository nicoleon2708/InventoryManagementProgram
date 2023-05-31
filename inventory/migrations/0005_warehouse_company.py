# Generated by Django 4.2 on 2023-05-24 09:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_alter_warehouse_options_warehouse_address_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='warehouse',
            name='company',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='warehouses', to='inventory.company'),
        ),
    ]
