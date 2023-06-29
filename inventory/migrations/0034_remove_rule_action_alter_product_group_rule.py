# Generated by Django 4.2 on 2023-06-19 03:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("inventory", "0033_remove_transferdetail_destination_location_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="rule",
            name="action",
        ),
        migrations.AlterField(
            model_name="product",
            name="group_rule",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="products",
                to="inventory.grouprule",
            ),
        ),
    ]
